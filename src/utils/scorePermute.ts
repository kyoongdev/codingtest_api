function scorePermute(scoreM: number, scoreB: number, scoreT: number, scoreI: number) {
  let resultId: number = 0;

  if (scoreM > 6) {
    if (scoreB > 6) {
      if (scoreT > 6) {
        if (scoreI > 6) {
          resultId = 12;
        } else {
          resultId = 11;
        }
      } else {
        if (scoreI > 6) {
          resultId = 10;
        } else {
          resultId = 9;
        }
      }
    } else {
      if (scoreT > 6) {
        if (scoreI > 6) {
          resultId = 16;
        } else {
          resultId = 15;
        }
      } else {
        if (scoreI > 6) {
          resultId = 14;
        } else {
          resultId = 13;
        }
      }
    }
  } else {
    if (scoreB > 6) {
      if (scoreT > 6) {
        if (scoreI > 6) {
          resultId = 4;
        } else {
          resultId = 3;
        }
      } else {
        if (scoreI > 6) {
          resultId = 2;
        } else {
          resultId = 1;
        }
      }
    } else {
      if (scoreT > 6) {
        if (scoreI > 6) {
          resultId = 8;
        } else {
          resultId = 7;
        }
      } else {
        if (scoreI > 6) {
          resultId = 6;
        } else {
          resultId = 5;
        }
      }
    }
  }
  return resultId;
}

export default scorePermute;
