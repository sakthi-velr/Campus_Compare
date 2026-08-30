/**
 * TypeScript Database Query Engine for mock databases.
 * Evaluates filter matches and handles multivariable ordering.
 */

export function matchCollege(college: any, where: any): boolean {
  if (!where) return true;

  // Handle AND logical group
  if (where.AND) {
    const ands = Array.isArray(where.AND) ? where.AND : [where.AND];
    if (!ands.every((cond: any) => matchCollege(college, cond))) {
      return false;
    }
  }

  // Handle OR logical group
  if (where.OR) {
    const ors = Array.isArray(where.OR) ? where.OR : [where.OR];
    if (!ors.some((cond: any) => matchCollege(college, cond))) {
      return false;
    }
  }

  // Handle NOT logical group
  if (where.NOT) {
    const nots = Array.isArray(where.NOT) ? where.NOT : [where.NOT];
    if (nots.some((cond: any) => matchCollege(college, cond))) {
      return false;
    }
  }

  // Handle individual fields matches
  for (const key of Object.keys(where)) {
    if (key === "AND" || key === "OR" || key === "NOT") continue;

    const filterVal = where[key];
    const collegeVal = college[key];

    if (filterVal === undefined) continue;

    if (typeof filterVal === "object" && filterVal !== null) {
      for (const op of Object.keys(filterVal)) {
        const val = filterVal[op];
        if (op === "equals") {
          if (String(collegeVal).toLowerCase() !== String(val).toLowerCase()) return false;
        } else if (op === "contains") {
          if (!String(collegeVal).toLowerCase().includes(String(val).toLowerCase())) return false;
        } else if (op === "in") {
          const list = Array.isArray(val) ? val : [val];
          const lowerList = list.map((item: any) => String(item).toLowerCase());
          if (!lowerList.includes(String(collegeVal).toLowerCase())) return false;
        } else if (op === "not") {
          if (typeof val === "object" && val !== null) {
            if (matchCollege({ [key]: collegeVal }, { [key]: val })) return false;
          } else {
            if (collegeVal === val) return false;
          }
        } else if (op === "lte") {
          if (Number(collegeVal) > Number(val)) return false;
        } else if (op === "gte") {
          if (Number(collegeVal) < Number(val)) return false;
        } else if (op === "lt") {
          if (Number(collegeVal) >= Number(val)) return false;
        } else if (op === "gt") {
          if (Number(collegeVal) <= Number(val)) return false;
        }
      }
    } else {
      if (String(collegeVal).toLowerCase() !== String(filterVal).toLowerCase()) return false;
    }
  }

  return true;
}

export function sortColleges(colleges: any[], orderBy: any): any[] {
  if (!orderBy) return colleges;

  const orders = Array.isArray(orderBy) ? orderBy : [orderBy];

  return [...colleges].sort((a, b) => {
    for (const order of orders) {
      const field = Object.keys(order)[0];
      const direction = order[field];

      const valA = a[field];
      const valB = b[field];

      if (valA === valB) continue;

      if (typeof valA === "number" && typeof valB === "number") {
        return direction === "asc" ? valA - valB : valB - valA;
      }
      
      const cmp = String(valA).localeCompare(String(valB));
      return direction === "asc" ? cmp : -cmp;
    }
    return 0;
  });
}
