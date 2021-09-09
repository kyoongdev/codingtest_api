function gradePermute(score : number){
    if(score === 100) return 'A+';
    else if(score >= 95) return 'A';
    else if(score >= 90) return 'B';
    else if(score >= 85) return 'C';
    else if(score >= 80) return 'D';
    else return 'F';
}

export  default gradePermute;