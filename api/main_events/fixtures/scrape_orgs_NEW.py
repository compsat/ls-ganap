from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup as bs
from os.path import basename, splitext
import requests

def simple_get(url):

	try:
		with closing(get(url, stream=True)) as resp:
			if is_good_response(resp):
				return resp.content
			else:
				return None
	except RequestException as e:
		log_error('Error during request to {0} : {1}'.format(url, str(e)))
		return None


def is_good_response(resp):
	
	content_type = resp.headers['Content-Type'].lower()
	
	return (resp.status_code==200
		and content_type is not None
		and content_type.find('html') > -1)

def log_error(e):
	print(e)

raw_html = simple_get("https://www.coarecweek2019.com")

html = bs(raw_html, 'html.parser')

file = open('organizations_2.yaml', 'w')

for i, cluster in enumerate(html.findAll("a", {"class": "ca1link"})):
	href = cluster['href']
	if href is not None:
		cluster_raw_html = simple_get(href)
		cluster_html = bs(cluster_raw_html, 'html.parser')

		for j, org in enumerate(cluster_html.findAll("a", {"class": "ca1link"})):
			org_href = org['href']
			org_raw_html = simple_get(org_href)
			org_html = bs(org_raw_html, 'html.parser')
			
			name_div = org_html.find("div", {"data-min-height": "131"})
			name = ""
			for k, partial in enumerate(name_div.findAll("h2")):
				if partial.string:
					name += partial.string

			desc = org_html.find("p", {"class": "font_7"}).span.span.string
			abbreviation = org_href.split('coarecweek2019.com/')[1]
			cluster_pk = i+1
			org_pk = i+j+1

			print(name)
			file.write('{}\n'.format(org_pk))
			file.write('Name: {}\n'.format(name))
			file.write('Description: {}\n'.format(desc))
			file.write('Abbreviation: {}\n'.format(abbreviation))
			file.write('Cluster: {}\n'.format(cluster_pk))
			file.write('\n')
		