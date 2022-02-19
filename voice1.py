import pyttsx3
import speech_recognition as sr              
from colorama import *
import os
import pyautogui
import time




engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
#print(voices[0].id)
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
        speak("Cannot Recognise speak again")
    #return "none"
    return text
    #def hello():
'''def add(): 
  pyautogui.write("+")

def sub(): 
 return pyautogui.write("-")

def symbols(a):
 switch={
      'plus': add(),
      'minus':sub(),
      }
 return switch.get(a,"Invalid input")'''
def symbol(a):
    if 'plus' in a.lower():
        pyautogui.write("+")
    elif 'subtract' in a.lower():
        pyautogui.write("-")
    elif 'multiply' in a.lower():
        pyautogui.write("*")
    elif 'divide' in a.lower():
        pyautogui.write("/")
    elif 'equal to' in a.lower():
        pyautogui.write("=")
    elif 'increment' in a.lower():
        pyautogui.write("++")
    elif 'decrement' in a.lower():
        pyautogui.write("--")
    elif 'open circular bracket' in a.lower():
        pyautogui.write("(")
        speak("printing")
    elif 'close circular bracket' in a.lower():
        pyautogui.write(")")
        speak("printing")
    elif 'single inverted comma' in a.lower():
        pyautogui.write("''")
        speak("printing")
    elif 'double quote' in a.lower():
        pyautogui.write("")
    
    elif 'angular brackets' in a.lower():
        pyautogui.write("<>")
    elif 'curly brackets' in a.lower():
        pyautogui.write("{}")
    elif 'dot' in a.lower():
        pyautogui.write(".")
    elif 'next line' in a.lower():
        pyautogui.typewrite(['ENTER'])
    else:
        pyautogui.write(a)
        

if __name__=="__main__":
   
    while True :
        query = takecommand()        
        print(query)
        if 'compiler' in query:
           speak("opening compiler")
           os.system("start /max chrome  http://localhost:3000/")
           #os.system("start notepad")
        if 'erase all' in query:
           pyautogui.hotkey("ctrl","a")
           pyautogui.typewrite(['backspace'])
           time.sleep(7)
           pyautogui.position(195,286)
           pyautogui.click()
           speak("Start Programming?")
           pyautogui.click()
        #pyautogui.write(query)
        symbol(query)
        

        '''if 'equal to' in query.lower():
            pyautogui.write("=")
        if 'Addition' in query.lower():
            pyautogui.write("+")
        if 'Minus' in query.lower():
            pyautogui.write("-")
        if 'Multiply by' in query.lower():
            pyautogui.write("*")
        if 'Division' in query.lower():
            pyautogui.write("/")'''
            
           #pyautogui.typewrite(['('])
           #pyautogui.typewrite(['"'])
           #pyautogui.write(query)'''
           #time.sleep(4)
           #speak("Running")
