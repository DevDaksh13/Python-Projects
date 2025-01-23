names = eval(input("Enter the list: ")) #Enter the list of names
import random
num_items = len(names) #The number of names in the list
random_name = random.randint(0, num_items - 1)
print(f"{names[random_name]} is going to buy the meal today!") 