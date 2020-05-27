import asyncio
import json
from django.contrib.auth import get_user_model
from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async

import speech_recognition as sr
r = sr.Recognizer()

class SummaryConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        print("connected", event)
        await self.send({
            "type": "websocket.accept"
        })
    
    async def websocket_receive(self, event):
        jsonData = json.loads(event['text'])
        chunkIdx = jsonData['chunkIdx']
        # very hacky way of fixing bug where the first chunk is always an empty file
        if chunkIdx > 0:
            file_name = './file_'+str(chunkIdx)+'.flac'
            f = open(file_name, 'wb')
            arrayBuffer = bytearray(jsonData['arrayBuffer'].values())
            f.write(arrayBuffer)
            f.close()
            rand_audio = sr.AudioFile(file_name)
            with rand_audio as source:
                audio = r.record(source)
                
            text = r.recognize_google(audio)
            print(text)
        
    
    async def websocket_disconnect(self, event):
        print("disconnected", event) 
    