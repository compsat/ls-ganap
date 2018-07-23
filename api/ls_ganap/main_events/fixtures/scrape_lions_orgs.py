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




raw_html = simple_get("http://lionshub.org/index.html#")

html = bs(raw_html, 'html.parser')

file = open('lions_organizations.yaml', 'w')

for i, org in enumerate(html.findAll("a", {"class": "card-link"})):
	
	if org.h1 is not None:
		print(i, org.h1.text.strip())
		file.write('- model: main_events.eventhost\n')
		#Org name
		file.write('  pk: {}\n'.format(i+54))
		file.write('  fields:\n')
		file.write('    host_type: 1\n')
		file.write('  accredited: False\n')
		
		#Name
		# print(i, org.p.text.strip())
		file.write('    name: {}\n'.format(org.h1.text.strip()))

		org_link = 'http://lionshub.org/' + org['href']

		#Abbreviation
		try: 
			# print(org_link.split('organizations/')[1])
			file.write('    abbreviation: {}\n'.format(org['href'][:-5]))	
		except IndexError:
			# print('    abreviation: FIX')
			file.write('    abbreviation: FIX\n')

		org_page_raw = simple_get(org_link)

		org_page_data = bs(org_page_raw, 'html.parser')


		#Description
		try:
			# description = org_page_data.select('#org-description-description')[0].p.text.strip()
			description = org_page_data.find("div", {"class": "organization-wrapper"})

			main = description.find('h3').text.strip()
			result = main + "\n"

			lists = description.findAll('li')

			for paragraphs in lists:
				result += paragraphs.text.strip() + "\n"
			# print(result)	
			file.write('    description: {}\n'.format(" ".join(result.split('\n'))))

			logo_url = description.find("img", {"class": "org-image"})['src']
			file.write('    logo_url: {}\n'.format("lionshub.org/" + logo_url))

		except IndexError:
			# print('    desciption: FIX')
			file.write('    description: FIX\n')
			file.write('    logo_url: FIX\n')

		

	