print("Thank you for choosing Python Pizza Deliveries!")
size = input("What size pizza would you like: ") 
add_pepperoni = input("Do you want pepporini?: ") 
extra_cheese = input("Would you like some extra cheese?: ") 
bill = 0
if size == "S":
  bill = bill + 15
elif size == "M":
  bill = bill + 20
else:
  bill = bill + 25

if add_pepperoni == "Y":
  if size == "S":
    bill += 2
  else:
    bill += 3

if extra_cheese == "Y":
  bill += 1

print(f"Your final bill is: ${bill}.")