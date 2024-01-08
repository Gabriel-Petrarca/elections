import gspread
from oauth2client.service_account import ServiceAccountCredentials


# Authenticate Google API credentials. Create the spreadsheet and share it with necessary users
scope = ['https://www.googleapis.com/auth/spreadsheets',"https://www.googleapis.com/auth/drive"]

credentials = ServiceAccountCredentials.from_json_keyfile_name('gs-credentials.json', scope)
client = gspread.authorize(credentials)

#sheet = client.create("SAC Elections")

#sheet.share('spangenbergabby@gmail.com', perm_type='user', role= 'writer')


# Open the correct sheets and make necessary updates
sheet = client.open('SAC Elections')

login_info = sheet.get_worksheet(0)
pres1 = login_info.acell('A2').value
print(pres1)

candidates = sheet.get_worksheet(1)
