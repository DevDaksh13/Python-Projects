print("The Love Calculator is calculating your score...")
name1 = input("What is the first name: ") 
name2 = input("What is the second name: ") 

combined_names = name1 + name2
names_lowercase = combined_names.lower()
t = names_lowercase.count("t")
r = names_lowercase.count("r")
u = names_lowercase.count("u")
e = names_lowercase.count("e")
first_digit = t + r + u + e

l = names_lowercase.count("l")
o = names_lowercase.count("o")
v = names_lowercase.count("v")
e = names_lowercase.count("e")
second_digit = l + o + v + e

love_score = int(str(first_digit) + str(second_digit))

if love_score < 10 or love_score > 90:
  print(f"Your score is {love_score}, you go together like coke and mentos.")
elif love_score < 50 and love_score > 40:
  print(f"Your score is {love_score}, you are alright together.")
else:
    print(f"Your score is {love_score}.")