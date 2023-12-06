import requests
import re
from bs4 import BeautifulSoup


cve_url = 'https://www.opencve.io/cve'
cve_page = requests.get(cve_url)
soup = BeautifulSoup(cve_page.content, 'html.parser')

rows = soup.find_all('tr', {'class': 'cve-header'})

for row in rows:
    cve = []
    cells = row.find_all('td')

    for cell in cells:  
        cve.append(cell.get_text(strip=True))
    
    print(f'[ {cve[0]} - {cve[1]} - {cve[2]} - {cve[3]} - {cve[5]}')



