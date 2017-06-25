class DateUtil {
  static sortBy(targets:[], dateProp:string):Array {
    targets.sort((a, b) => {
      const aDate = Date.parse(a[dateProp]);
      const bDate = Date.parse(b[dateProp]);
      return aDate < bDate ? 1 : -1;
    });
    return targets;
  }

  static getDate(target) {
    const d = new Date(target);
    return `${d.getFullYear()} ${d.getMonth() + 1}/${d.getDate()}`;
  }
}

export default DateUtil;