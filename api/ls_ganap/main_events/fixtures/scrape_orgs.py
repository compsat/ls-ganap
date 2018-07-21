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

html = bs(raw_html, 'html.parser')

file = open('organizations.yaml', 'w')

for i, org in enumerate(html.findAll("div", {"class": "org-thumbnail"})):
	
	if org.p is not None:
		print(i, org.p.text.strip())
		file.write('- model: main_events.eventhost\n')
		#Org name
		file.write('  pk: {}\n'.format(i+1))
		file.write('  fields:\n')
		file.write('    host_type: 1\n')
		
		#Name
		# print(i, org.p.text.strip())
		file.write('    name: {}\n'.format(org.p.text.strip()))

		org_link = org.p['onclick'].split("=")[1][1:-2]

		#Abbreviation
		try: 
			# print(org_link.split('organizations/')[1])
			file.write('    abbreviation: {}\n'.format(org_link.split('organizations/')[1]))	
		except IndexError:
			# print('    abbreviation: FIX')
			file.write('    abbreviation: FIX\n')

		org_page_raw = simple_get(org_link)

		org_page_data = bs(org_page_raw, 'html.parser')


		#Cluster
		try:
			cluster = org_page_data.select('#page-subtitle')[0].text
			# print(cluster)
			file.write('    cluster: {}\n'.format(cluster))

		except IndexError:
			# print('    cluster: FIX')
			file.write('    cluster: FIX\n')
			

		#Description
		try:
			# description = org_page_data.select('#org-description-description')[0].p.text.strip()
			description = org_page_data.select('#org-description-description')

			for x in description:
				paragraphs = x.findAll('p')
				result = "";
				for para in paragraphs:
					result += para.text.strip()
			# print(result)	
			file.write('    description: {}\n'.format(" ".join(result.split('\n'))))

		except IndexError:
			# print('    desciption: FIX')
			file.write('    description: FIX\n')

		

	