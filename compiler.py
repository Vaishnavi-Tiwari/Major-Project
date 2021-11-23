import pyttsx3
import speech_recognition as sr
from colorama import *
import os
import pyautogui
import time

rec="Sorry, could not recognise"
engine = pyttsx3.init('sapi5') #microsoftapi
voices = engine.getProperty('voices')
print(voices)
engine.setProperty('voice',voices[0].id)

def speak(audio):
    engine.say(audio)
    engine.runAndWait()


def takecommand():
    r=sr.Recognizer()
    #print(sr.Microphone.list_microphone_names())
    with sr.Microphone() as source:
         r.adjust_for_ambient_noise(source,duration=1)
         
         #r.energy_threshold()
         print(Fore.GREEN+"Listening : "+Fore.RESET)
         audio= r.listen(source)
    try:
        text = r.recognize_google(audio)
        print(Fore.YELLOW+text+Fore.RESET)
    except:
        print(Fore.RED+"sorry, could not recognise"+Fore.RESET)
        speak(rec)
   
       
        #return "none"
    return text  
   
if __name__=="__main__":
   
    while True :
        query = takecommand()
        if 'open code editor' in query.lower():
           speak("opening code editor")
           os.system("start  ide.py")
           time.sleep(5)
           speak("which program you want ?")
           while True :
               test = takecommand()
               if 'print' in test.lower():
                 pyautogui.typewrite(['BKSP'])
                 pyautogui.write("print('")
               if 'save this code' in test.lower():
                 pyautogui.typewrite(['BKSP'])
                 speak("saving code")
                 pyautogui.hotkey("ctrl","s")
                 pyautogui.typewrite(['BKSP'])
                 speak("what should i name this file ?")
                 filename = takecommand()
                 pyautogui.write(filename+".py")
                 pyautogui.typewrite(['ENTER'])
               if 'run' in test.lower():
                 speak("running code")
                 pyautogui.hotkey("f5")
                 pyautogui.typewrite(['BKSP'])
               '''if 'print' in test.lower():
                 pyautogui.typewrite(['BKSP'])
                 pyautogui.write("print('")'''
               if 'close this bracket' in test.lower():
                 pyautogui.write("')")
               #pyautogui.typewrite(['BKSP'])
               pyautogui.write(test)
               speak(test)
