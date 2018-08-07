import pandas as pd

data = pd.read_csv('emails.csv')
data1 = pd.read_csv('organizations.csv')
file = open('org_users.yaml', 'w')

for index, rows in data.iterrows():
    file.write('- model: main_events.orguser\n')
    file.write('  pk: ' +str(index +1)+'\n')
    file.write('  fields:\n')
    file.write('    email: ' + rows[2] + rows[3][1:] + '\n')
    file.write('    password: ' + rows[2] + '\n')
    
    eh_id = "#FIX"

    for i, r in data1.iterrows():
        if(rows[1].lower() == r[4].lower()):
            eh_id = r[1]

    file.write('    event_host: ' + str(eh_id) + '\n')

file.close()