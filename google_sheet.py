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
def add_vote(voter, candidate):
    voters_map[voter] = candidate
def record_vote(col):
    for voter, candidate in voters_map.items():
        # every voter is mapped to the candidate they voted for. Row index = voter
        row_index = login_info.col_values(3).index(voter) + 1  
        cell_list.append(Cell(row_index, col, candidate))
    login_info.update_cells(cell_list)
    voters_map.clear()

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