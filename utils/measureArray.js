/**
 * Summary: This function measures one array against another.
 * Description: This function calculates for each element in subjects, the indexes of elements in ruler of which the sum is in range of the subject element cumulatively.
 * @param {[float]} subjects An array of numbers representing the subjects to be measured.
 * @param {[float]} ruler An array of numbers representing the length of each unit in a ruler.
 * @return {[int]} Returns an array that corresponds to each element in subjects.
 */

function measureArray(subjects, ruler) {
  var sub_index = 0;
  var rul_index = 0;
  var sub_cum = subjects[0];
  var rul_cum = ruler[0];
  var result = []
  function addResult(s_i, r_i, result) {
    if (result.length === s_i) {
      result.push([r_i]);
    } else if (result.length - 1 === s_i) {
      result[s_i].push(r_i);
    } else {
      throw "Input error: s_i needs to be the last index of result or last index + 1"
    }
  }
  while (sub_index < subjects.length && rul_index < ruler.length) {
    addResult(sub_index, rul_index, result)
    if (sub_cum > rul_cum) {
      rul_index += 1;
      rul_cum += ruler[rul_index];
    } else if (sub_cum < rul_cum) {
      sub_index += 1;
      sub_cum += subjects[sub_index];
    } else {
      // Case when sub_cum === rul_cum
      sub_index += 1;
      rul_index += 1;
      sub_cum += subjects[sub_index];
      rul_cum += ruler[rul_index];
    }
  }
  return result;
}

module.exports = measureArray;