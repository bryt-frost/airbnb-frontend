import requests
from meta_ai_api import MetaAI

ai = MetaAI()
response = ai.prompt(message="who is Osama bin ladin")

if response:

    print("============== OUTPUT START =============")
    print(response)
    print("============== OUTPUT END ===============")
else:
    print("============== OUTPUT START =============")
    print("something")
    print("============== OUTPUT END ===============")
