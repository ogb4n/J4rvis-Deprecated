import requests
from bs4 import BeautifulSoup
import json

cve_url = 'https://www.opencve.io/cve'
cve_page = requests.get(cve_url)
soup = BeautifulSoup(cve_page.content, 'html.parser')

rows = soup.find_all('tr', {'class': 'cve-header'})
descs = soup.find_all('tr', {'class': 'cve-summary'})

# List to store information of all CVEs
all_cve_info = []

# Iterate over each CVE row
for i, row in enumerate(rows):
    # Initialize a dictionary for each CVE
    cve_info = {}
    cve_desc = []

    # Find all cells in the current row
    cells = row.find_all('td')

    # Ensure that there are at least 6 cells in the row
    if len(cells) >= 6:
        cve_info['CVE_ID'] = cells[0].get_text(strip=True)
        cve_info['Vendor'] = cells[1].get_text(strip=True)
        cve_info['Product'] = cells[2].get_text(strip=True)
        cve_info['Date'] = cells[3].get_text(strip=True)
        cve_info['Severity'] = cells[5].get_text(strip=True)

        # Store the information in the dictionary
        cve_info['Description'] = []
        cve_info['Link'] = cve_url + '/' + cve_info['CVE_ID']

        # Iterate over descriptions and append to the list
        for desc_cell in descs[i].find_all('td'):
            cve_info['Description'].append(desc_cell.get_text(strip=True))

        # Append the CVE dictionary to the list
        severity_value = cve_info.get('Severity').split(' ')[0]
        if (cve_info.get('Severity') == 'N/A'):
        # print(f"Skipping CVE {cve_info.get('CVE ID', 'N/A')}: Severity is N/A")
            continue
        try:
            severity_value = float(cve_info.get('Severity').split(' ')[0])
        except ValueError:
            # print(f"Skipping CVE {cve_info.get('CVE ID', 'N/A')}: Invalid severity format")
            continue

    if severity_value > 5.2:
            all_cve_info.append(cve_info)

json_output = json.dumps(all_cve_info, indent=2)
print(json_output)