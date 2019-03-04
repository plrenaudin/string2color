# string2color

Small tool giving a fixed color depending on the string provided as input

## Installation

`npm i string2color`

## Usage

```
import string2color from "string2color";

string2color("hello"); // "hsl(172, 100%, 75%)"

string2color("hello", { format: "rgb }); // "#80ffee"
```

## Configuration

| Option         | Default | Description                               |
| -------------- | ------- | ----------------------------------------- |
| **format**     | `hsl`   | Supported format: `rgb` or `hsl`          |
| **saturation** | 100     | Saturation percentage (between 0 and 100) |
| **lightness**  | 75      | Lightness percentage (between 0 and 100)  |
