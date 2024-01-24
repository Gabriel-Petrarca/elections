import gspread
from oauth2client.service_account import ServiceAccountCredentials
from flask import Flask, jsonify
from gspread import Cell

# Authenticate Google API credentials. Create the spreadsheet and share it with necessary users
scope = ['https://www.googleapis.com/auth/spreadsheets',"https://www.googleapis.com/auth/drive"]

credentials = ServiceAccountCredentials.from_json_keyfile_name('gs-credentials.json', scope)
client = gspread.authorize(credentials)

#sheet = client.create("SAC Elections")

#sheet.share('spangenbergabby@gmail.com', perm_type='user', role= 'writer')


# Open the correct sheets and make necessary updates
sheet = client.open('SAC Elections')
login_info = sheet.get_worksheet(0)
candidates = sheet.get_worksheet(1)
emails = login_info.col_values(3)
headers = login_info.row_values(1)

cell_list = []
voters_map = {}

# make function user_logout where it would take the voter index to find the row and then move email from column 3 to column 4
# the try and except function makes sure that the program doesnt crash if for some reason the voter who logs out isnt in column 3
def user_logout(voter_email):
    try:
        row_index = emails.index(voter_email) + 1 
    
        # Get the email from column 3
        email_to_move = login_info.cell(row_index, 3).value
        
        # Delete the email from column 3
        login_info.update_cell(row_index, 3, '')
        
        # Add the email to column 4
        login_info.update_cell(row_index, 4, email_to_move)
        
        return {'status': 'success', 'message': f'Email moved from column 3 to column 4 for user: {voter_email}'}
    except ValueError:
        return {'status': 'error', 'message': voter_email}



def add_vote(voter, candidate):
    voters_map[voter] = candidate

def record_vote(col):
    for voter, candidate in voters_map.items():
        # every voter is mapped to the candidate they voted for. Row index = voter
        row_index = login_info.col_values(3).index(voter) + 1  
        cell_list.append(Cell(row_index, col, candidate))
    login_info.update_cells(cell_list)
    voters_map.clear()

# get all data from sheet and store them as a variable
def get_pres_candidates():
    candidates_data = candidates.col_values(1)[1:10] 
    return candidates_data
def get_memb_candidates():
    candidates_data = candidates.col_values(2)[1:10] 
    return candidates_data
def get_AO_candidates():
    candidates_data = candidates.col_values(3)[1:10] 
    return candidates_data
def get_SE_candidates():
    candidates_data = candidates.col_values(4)[1:10] 
    return candidates_data
def get_MC_candidates():
    candidates_data = candidates.col_values(5)[1:10] 
    return candidates_data
def get_Finance_candidates():
    candidates_data = candidates.col_values(6)[1:10] 
    return candidates_data
def get_IandB_candidates():
    candidates_data = candidates.col_values(7)[1:10] 
    return candidates_data
#get the data for the other votes variables
def get_othervote_prompt():
    prompt_data = candidates.col_values(8)[1]
    return prompt_data
def get_othervote_options():
    options_data = candidates.col_values(8)[2:10]
    return options_data