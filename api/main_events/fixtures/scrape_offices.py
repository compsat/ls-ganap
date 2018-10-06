import pandas as pd
import numpy as np

data = pd.read_csv('office_emails.csv')
file = open('office_users.yaml', 'w')

for index, rows in data.iterrows():
    file.write('- model: main_events.user\n')
    file.write('  pk: ' +str(index +65)+'\n')
    file.write('  fields:\n')
    file.write('    email: ' + rows[1] + '\n')
    file.write('    password: pbkdf2_sha256$100000$2BqNAoQ4SyuQ$24dCvbhMGyJX+INmbMIJXAUOpBKTXeDu6cdt2gnVXm4=\n')

file.close()

file = open('offices.yaml', 'w')

for index, rows in data.iterrows():

    file.write('- model: main_events.officehost\n')
    file.write('  pk: ' + str(index+1) + '\n')
    file.write('  fields:\n')
    file.write('    user: ' + str(index+65) + '\n')
    file.write('    name: "' + rows[0] + '"\n')
    file.write("    abbreviation: " + rows[2] + "\n")
    file.write('    description: "' + rows[0] + '"\n')
    file.write("    color: '#0000EE'\n")
    file.write("    logo_url: ../admu\n")
    file.write("    event_host: 1" + "\n")
