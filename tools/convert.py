# this file contains the python script i used to convert from pedal playground's json scheme to the one that i used for my db
# filenames were hardcoded in since there didn't need to be a lot of flexibility

import sys
import json


def replace_pedals(filename):

    old_strings = ["\"Brand\"", "\"Name\"", "\"Width\"", "\"Height\"", "\"Image\""]
    new_strings = ["\"pedalBrand\"", "\"pedalName\"", "\"pedalWidth\"", "\"pedalHeight\"", "\"pedalImageFileName\""]

    with open(filename) as f:
        s = f.read()

    for i in range(len(old_strings)):
        with open(filename, 'w') as f:
            s = s.replace(old_strings[i], new_strings[i])
            f.write(s)

    # add the price field
    with open(filename) as file:
        data = json.load(file)

        for item in data:
            item["pedalPrice"] = 0

        newData = json.dumps(data, indent=4)

    with open(filename, 'w') as file:
        file.write(newData)


def replace_pedalboards(filename):

    old_strings = ["\"Brand\"", "\"Name\"", "\"Width\"", "\"Height\"", "\"Image\""]
    new_strings = ["\"pedalboardBrand\"", "\"pedalboardName\"", "\"pedalboardWidth\"", "\"pedalboardHeight\"", "\"pedalboardImageFileName\""]

    with open(filename) as f:
        s = f.read()

    for i in range(len(old_strings)):
        with open(filename, 'w') as f:
            s = s.replace(old_strings[i], new_strings[i])
            f.write(s)

    # add the price field
    with open(filename) as file:
        data = json.load(file)

        for item in data:
            item["pedalboardPrice"] = 0

        newData = json.dumps(data, indent=4)

    with open(filename, 'w') as file:
        file.write(newData)

    return


def main():
    if len(sys.argv) < 2:
        print("usage: python3 convert.py [filename]")
        exit(0)
    
    if sys.argv[1] == "pedals.json":
        replace_pedals(sys.argv[1])
    
    if sys.argv[1] == "pedalboards.json":
        replace_pedalboards(sys.argv[1])


if __name__ == "__main__":
    main()