from django.shortcuts import render
from django.http import HttpResponse, HttpRequest, HttpResponseServerError
import json
# from nltk.tokenize import sent_tokenize, word_tokenize

# from summarizer import Summarizer
# from summarizer.coreference_handler import CoreferenceHandler

# handler = CoreferenceHandler(spacy_model="en_core_web_lg", greedyness=.4)
# model = Summarizer(sentence_handler=handler)

FULL_TEXT_LENGTH = 500

def summarize(request):
    if request.method == 'GET':
        jsonData = json.loads(request.body)
        try:
            fullText = jsonData['text']
            # paragraphs = splitText(fullText)
            # summarizedTexts = list(map(lambda p: genSummary(p), paragraphs))
            # print(summarizedTexts)
            print(fullText)
            
        except KeyError:
            HttpResponseServerError("Malformed data!")
            HttpResponse("Received JSON Data")
        # return HttpResponse(' '.join(summarizedTexts))
    
# def genSummary(text):
#     result = model(text)
#     return result
    
# def splitText(text):
#     paragraphs = []
#     sentences = sent_tokenize(text)
#     textLength = 0
#     para = ""
#     for s in sentences:
#         words = word_tokenize(s)
#         if textLength + len(words) <= FULL_TEXT_LENGTH:
#             para += s
#             textLength += len(words)
#         else:
#             paragraphs.append(para)
#             para = ""
#             textLength = 0
#     return paragraphs
    