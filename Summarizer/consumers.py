import asyncio
import json
from django.contrib.auth import get_user_model
from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async


class SummaryConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        print("connected", event)
        await self.send({
            "type": "websocket.accept"
        })
    
    async def websocket_receive(self, event):
        # print(event['text'])
        jsonData = json.loads(event['text'])
        chunkIdx = jsonData['chunkIdx']
        print(chunkIdx)
        f = open('./file_'+chunkIdx, 'wb')
        arrayBuffer = bytearray(jsonData['arrayBuffer'].values())
        f.write(arrayBuffer)
        f.close()
        
    
    async def websocket_disconnect(self, event):
        print("disconnected", event) 
    