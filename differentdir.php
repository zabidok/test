<?php

$input = [];
//$input[] = "3";
//$input[] = "87.342 34.30 start 0 walk 10.0";
//$input[] = "2.6762 75.2811 start -45.0 walk 40 turn 40.0 walk 60";
//$input[] = "58.518 93.508 start 270 walk 50 turn 90 walk 40 turn 13 walk 5";
//$input[] = "2";
//$input[] = "30 40 start 90 walk 5";
//$input[] = "40 50 start 180 walk 10 turn 90 walk 5";
//$input[] = "0";

foreach ($input as $f) {
	if (!isset($test_case)) {
		$count = intval($f);
		if ($count === 0) {
			break;
		}
		$test_case = new test_case($count);
	} else {
		if ($count > 0) {
			$test_case->add_person($f);
			$count--;
			if ($count === 0) {
				echo $test_case->centroid() . " " . $test_case->to_worst_direction() . "<br>";
				unset($test_case);
			}
		}
	}
}

class test_case
{
	function __construct($count)
	{
		$this->people = $count;
	}

	public function add_person($string)
	{
		$direction = 0;
		$tmp = explode(" start ", $string);
		$steps = $tmp[1];
		$this->xy = explode(" ", $tmp[0]);
		foreach (explode(" turn ", $steps) as $step) {
			$tmp2 = explode(" walk ", $step);
			$degrees = $tmp2[0];
			$length = $tmp2[1];
			$direction = 360 + $degrees + $direction;
			$this->move($direction, $length);
		}
		$this->endpoints[] = $this->xy;
	}

	public function centroid()
	{
		$coord = $this->endpoints;
		$centroid = array_reduce($coord, function ($x, $y) use ($coord) {
			$len = count($coord);
			return [round($x[0] + $y[0] / $len, 4), round($x[1] + $y[1] / $len, 4)];
		}, array(0, 0));
		return $centroid[0] . " " . $centroid[1];
	}

	public function to_worst_direction()
	{
		$max_distance = 0;
		$centroid = explode(" ", $this->centroid());
		foreach ($this->endpoints as $point) {
			$distance = sqrt(pow(($point[0] - $centroid[0]), 2) + pow(($point[1] - $centroid[1]), 2));
			$max_distance = $distance > $max_distance ? $distance : $max_distance;
		}
		return round($max_distance, 4);
	}

	private function move($direction, $length)
	{
		$this->xy[0] += $length * cos($direction * M_PI / 180);
		$this->xy[1] += $length * sin($direction * M_PI / 180);
	}
}
