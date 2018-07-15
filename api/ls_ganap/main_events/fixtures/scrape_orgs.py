from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup as bs


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




raw_html = simple_get("https://web.archive.org/web/20171029050715/http://coacentral.org:80/organizations/")
# raw_html = simple_get("http://google.com")
# print(raw_html)

html = bs(raw_html, 'html.parser')
for i, org in enumerate(html.findAll("div", {"class": "org-thumbnail"})):
	
	if org.p is not None:

		#Org name
		print(i, org.p.text)	
		org_link = org.p['onclick'].split("=")[1][1:-2]

		#Abreviation
		print(org_link.split('organizations/')[1])

		org_page_raw = simple_get(org_link)

		org_page_data = bs(org_page_raw, 'html.parser')
		cluster = org_page_data.select('#page-subtitle')[0].text
		description = org_page_data.select('#org-description-description')[0].p.text
		
		#Cluster
		print(cluster)

		#Description
		print(description)
		





	