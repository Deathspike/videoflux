# Unscientific Video Comparison

The information contained within this comparison table has been compiled based on casual observation and informal data gathering methods, rather than systematic, scientifically valid procedures. The data and subsequent analysis have not been subjected to rigorous checks, peer reviews, or statistical analysis that are customary in professional scientific research. Consequently, this comparison should be viewed as preliminary, speculative, and for informational purposes only.

## Comparison

The following comparison provides a perspective on various AV1 encoding presets in contrast to the more established standards, H.264 and H.265, which serve as our reference benchmarks. AV1, known for its efficiency in compressing video files without significantly impacting the visual quality, offers several presets, each representing a balance between encoding speed and compression rate. This comparison aims to highlight the disparities in performance characteristics such as encoding time, file size, and video quality.

### Source

The subject of our comparative analysis is a near-lossless H.264 encoded file, characteristic of those released by publishers on high-quality streaming services, often referred to as a web-distributed download. Given its prevalence and standardization across various streaming platforms, this will serve as a baseline for comparing encoding efficiency and output quality across various presets.

### Results

For the sake of transparency and reproducibility, it's essential to detail the environment in which these encoding tests were conducted. All evaluations were carried out using `ffmpeg 2023-10-16-git-5ddab49d48`. To ensure consistent performance metrics and minimize hardware-based discrepancies, all tests were executed on a machine powered by an `Intel i5-11400` processor running on `Microsoft Windows 11`.

|        | Preset   | CRF | Speed (x) | File Size | Save (%) | Save (Δ) | VMAF    | VMAF (Δ) | Efficiency (<) |
| ------ | -------- | --- | --------- | --------- | -------- | -------- | ------- | -------- | -------------- |
| Source |          |     |           | 1.323.521 |          |          |         |          |                |
| av1    | 12       | 24  | 2,90      | 229.467   | 82,66    |          | 95,1880 |          | 28,50          |
| av1    | 11       | 24  | 2,64      | 208.789   | 84,22    | 1,56     | 95,4209 | 0,23     | 31,90          |
| av1    | 10       | 24  | 2,16      | 202.447   | 84,70    | 0,48     | 95,7620 | 0,34     | 39,21          |
| av1    | 9        | 24  | 1,55      | 197.826   | 85,05    | 0,35     | 96,1946 | 0,43     | 54,87          |
| av1    | 8        | 24  | 1,40      | 212.754   | 83,93    | \-1,13   | 96,4557 | 0,26     | 59,95          |
| av1    | 7        | 24  | 0,97      | 199.263   | 84,94    | 1,02     | 96,5604 | 0,10     | 87,30          |
| av1    | 6        | 24  | 0,54      | 189.873   | 85,65    | 0,71     | 96,6875 | 0,13     | 158,62         |
| av1    | 5        | 24  | 0,36      | 185.437   | 85,99    | 0,34     | 96,8233 | 0,14     | 237,54         |
| av1    | 4        | 24  | 0,26      | 174.635   | 86,81    | 1,15     | 96,8873 | 0,06     | 340,41         |
| h265   | veryfast | 20  | 2,15      | 243.046   | 81,64    | \-4,27   | 95,5795 |          | 37,97          |

### Observations

- The AV1 presets `7` and `8` result in larger file sizes compared to preset `9`. This outcome defies the typical expectation that lower preset numbers, which indicates slower encoding speeds, should provide smaller file sizes due to more thorough compression. The inefficiency of presets `7` and `8` in terms of file size compression, despite the slower encoding settings, makes them unfavorable choices.
- The AV1 presets `6` and below have diminishing returns on performance. While one expects significant improvements in aspects like file size reduction or video quality in exchange for these speeds, these findings indicate marginal gains. This imbalance suggests that these lower presets, specifically `6` and below, may not be practical choices in environments where encoding speed is as valuable as, or more critical than, the slight improvements in compression efficiency and output quality.
- The AV1 presets `12` through `9` exhibit a consistent trade-off: they sacrifice encoding speed in exchange for reduced file size and enhanced video quality. Each of these presets maintains an encoding speed above real-time. Within this group, preset `9` emerges as particularly advantageous. It offers a balance by achieving noticeable file size compression and visual quality without dipping below real-time speed.
- The H.265 preset `veryfast` and AV1 preset `10` exhibit similar encoding speeds. However, the AV1 preset not only produces a smaller file size but also achieves a better `VMAF` score, indicating superior compression efficiency and video quality from the AV1 codec compared to its H265 counterpart.

# Conclusion

AV1 preset `9` distinguishes itself as the most balanced option among those tested. It proficiently navigates the trade-offs between encoding speed, file size, and video quality, adhering to the desirable standard of real-time encoding speed. While other presets presented advantages, they came with compromises in critical areas. Preset `9` notably outperforms presets `7` and `8`, which consistently yielded larger files, and offers a more practical efficiency compared to presets `6` and below. This conclusion, drawn from our informal, experiential analysis, underscores preset `9`'s potential as a go-to option for those who prioritize both speed and quality.
