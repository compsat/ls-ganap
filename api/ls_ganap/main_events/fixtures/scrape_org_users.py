import pandas as pd

data = pd.read_csv('emails.csv')
data1 = pd.read_csv('organizations.csv')
file = open('org_users.yaml', 'w')

for index, rows in data.iterrows():
    file.write('- model: main_events.user\n')
    file.write('  pk: ' +str(index +1)+'\n')
    file.write('  fields:\n')
    file.write('    email: ' + rows[2] + rows[3][1:] + '\n')
    file.write('    password: ' + rows[2] + '\n')

file.close()

file = open('organizations.yaml', 'w')

for index, rows in data1.iterrows():
    file.write('- model: main_events.orghost\n')
    file.write('  pk: ' + str(rows[1]) + '\n')
    file.write('  fields:\n')

    user_id = "#FIX"

    for i, r in data.iterrows():
        if (rows[4].lower() == r[1].lower()):
            user_id = i + 1

    # file.write('    user_id: ' + str(user_id) + '\n')
    file.write('    name: ' + rows[3] + '\n')
    file.write('    abbreviation: ' + rows[4] + '\n')
    file.write('    description: ' + rows[8] + '\n')
    file.write('    color: \'' + rows[6] + '\'\n')
    file.write('    logo_url: ../' + rows[4] + '\n')
    file.write('    event_host: 1')
    file.write('    org_type: 1')
    file.write('    cluster: ' + str(rows[5]) + '\n')
