import gspread
from oauth2client.service_account import ServiceAccountCredentials
from flask import Flask, jsonify

# Authenticate Google API credentials. Create the spreadsheet and share it with necessary users
scope = ['https://www.googleapis.com/auth/spreadsheets',"https://www.googleapis.com/auth/drive"]

credentials = ServiceAccountCredentials.from_json_keyfile_name(r'C:\Users\spang\elections\Backend\gs-credentials.json', scope)
client = gspread.authorize(credentials)

#sheet = client.create("SAC Elections")

#sheet.share('spangenbergabby@gmail.com', perm_type='user', role= 'writer')


# Open the correct sheets and make necessary updates
sheet = client.open('SAC Elections')
login_info = sheet.get_worksheet(0)
candidates = sheet.get_worksheet(1)
emails = login_info.col_values(3)
headers = login_info.row_values(1)

header_cols = {'President' : 'E', 'Membership' : 'F', 'AO' : 'G', 'SE' : 'H', 'Marketing' : 'I', 'Finance' : 'J', 'I&B' : 'K'}

def record_vote(candidate, voter, role):
        cell = header_cols[role] + str(emails.index(voter) + 1)

        login_info.update(cell, candidate)

def get_pres_candidates():
    candidates_data = candidates.col_values(1)[1:10]  # Assuming candidates are in column A starting from row 2 to row 5
    return candidates_data




