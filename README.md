# Foot Inch Sixteenth (FIS) Calculator
The FIS Calculator is a web application that allows drafters and architects to perform basic math operations using the foot-inch-sixteenth measuring system.

## Usage
You can find the calculator [here](https://bencornia.github.io/fis-calc/index.html).

The FIS measurement system uses whole numbers instead of fractions to indicate units of measurement. It uses the pattern foot-inch-sixteenth. For example, 3-3/4 inches would be represented as "3-12" (3 inches and 12 sixteenths). 

| Fractional Measurement   |   FIS Measurement | Enter As           |
|:------------------------:|:-----------------:|:------------------:|
| 7' 1-1/2"                | 7-01-08           | 70108              |
| 1/4"                     |     4             | 4                  |
| 10 3/16"                 | 10-00-03          | 100003             |
| 14"                      | 01-02-00          | 1400 OR 10200      |
| 1'                       | 1-00-00           | 1. or 10000        |
| 3' 6"                    | 3-06-00           | 3.5 or 30600       |

When entering a measurement into the calculator, remove dashes and enter as a single string. 3-00-13 would be entered as '30013'. Decimals can be used as a shortcut to input
measurements in feet. 1' could be entered as '1.'. 

In addition, leading zeros are optional. 000001 (1 sixteenth) is the same as 1. Trailing zeros are NOT optional. 000010 (10 sixteenths) is not the same as 1.

|Key         |    Button   |
|:----------:|:-----------:|
|   '+'      |     +       |

## Limitations
This is not a traditional calculator. It posesses pecularities that users may find unexpected. Numbers entered after a division or multiplication operator are NOT evaluated as a measurement. 

|Expression       |Expected Output|Actual Output|
|:---------------:|:------------:|:-----------:|
| 200 * 200       | 400          |  330400     |
| 200 / 200       | 1            |  000001     |
| 200 \*area\* 200| 400          |  400        |

For example, if you wanted to take the area of 2"x2" square, then you would enter 200 * 200 and expect it to equal 400 (2" * 2" = 4"). It will actually evaluate to 330400 (2" * 200 = 33'4"). 

The same is true for division. You would expect 200 / 200 to equal 1 (2" / 2" = 1"). Instead, it will evaluate to 1/100" (2" / 200 = .01"). The calculator will round up any measurement smaller than 1/16" and greater than 0 to 1/16".

The reasoning behind this makes sense from the perspective of a framer or architect. If I want to find the total thickness of 5 sticks of 2x4 lumber, then I can enter 108 * 5 and instead of giving me an area it returns a distance of 708 (7-1/2").

This is why there is a button specifically for taking the area. The number entered after the area operator WILL be evaluated as a measurement.

## Resources
* [wireframe](https://wireframe.cc/K2CKL2)

## License
![GitHub](https://img.shields.io/github/license/bencornia/fis-calc?style=flat-square)