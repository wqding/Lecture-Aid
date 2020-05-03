from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, HttpResponseServerError
import json
from nltk.tokenize import sent_tokenize, word_tokenize
import requests

FULL_TEXT_LENGTH = 500
SUMMARY_LENGTH = 100

def summarize(request):
    if request.method == 'GET':
        print("body: ",  request.body)
        jsonData = json.loads(request.body)
        print("json data: ", jsonData)
        try:
            fullText = jsonData['text']
            print("full text: ", fullText)
            paragraphs = splitText(fullText)
            summarizedTexts = list(map(lambda p: genSummary(p), paragraphs))
            
        except KeyError:
            HttpResponseServerError("Malformed data!")
            HttpResponse("Received JSON Data")
        return HttpResponse(' '.join(summarizedTexts))
    
def genSummary(text):
    # send request to https://api.smrzr.io/summarize?ratio=0.15
    ratio =  SUMMARY_LENGTH/FULL_TEXT_LENGTH
    print(ratio)
    r = requests.post('https://api.smrzr.io/summarize?ratio='+str(ratio),  data = text)
    jsonResp = json.loads(r.text)
    return(jsonResp['summary'])
    
def splitText(text):
    paragraphs = []
    sentences = sent_tokenize(text)
    textLength = 0
    para = ""
    for s in sentences:
        words = word_tokenize(s)
        if textLength + len(words) <= FULL_TEXT_LENGTH:
            para += s
            textLength += len(words)
        else:
            paragraphs.append(para)
            para = ""
            textLength = 0
    return paragraphs
    