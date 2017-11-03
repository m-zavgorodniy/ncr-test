## Test for NCR
by Maxim Zavgorodniy

NodeJS command-line application which accepts a list of countries as a command-line argument then sorts the list of countries by population

### Usage

```
population [options] [<country [<country> ...]>]
  Options:
    -l, --list     output the list of all countries
```

Example:
```
~/ncr-test-master$ node population Greece Brazil France Germany
Brazil: 211803502
Germany: 80611271
France: 65029330
Greece: 10885156
```
