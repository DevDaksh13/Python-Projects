print("How many weeks do you have left?")
age = input("What is your age: ")
years = 90 - int(age) #we assume there are 90 years left in our life.
weeks = years * 52
formatting_string = f"You have {weeks} weeks left."
print(formatting_string)