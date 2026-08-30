import collegesData from "../colleges.json";
import { matchCollege, sortColleges } from "./queryEngine";

// Persist caching maps globally to survive Hot Module Reloads during development
const globalForCache = globalThis as unknown as {
  findManyCache?: Map<string, any[]>;
  countCache?: Map<string, number>;
  findUniqueCache?: Map<string, any | null>;
};

const findManyCache = globalForCache.findManyCache ?? new Map<string, any[]>();
const countCache = globalForCache.countCache ?? new Map<string, number>();
const findUniqueCache = globalForCache.findUniqueCache ?? new Map<string, any | null>();

if (process.env.NODE_ENV !== "production") {
  globalForCache.findManyCache = findManyCache;
  globalForCache.countCache = countCache;
  globalForCache.findUniqueCache = findUniqueCache;
}

/**
 * Mock Prisma Client wrapping the colleges JSON database.
 * Emulates prisma.college.findUnique, findMany, and count.
 */
export const prisma = {
  college: {
    findUnique: async (args: { where: { slug?: string; id?: string } }) => {
      const cacheKey = JSON.stringify(args.where);
      if (findUniqueCache.has(cacheKey)) {
        return findUniqueCache.get(cacheKey);
      }
      
      const { slug, id } = args.where;
      let college = null;
      if (slug) {
        college = collegesData.find((c) => c.slug === slug) || null;
      } else if (id) {
        college = collegesData.find((c) => c.id === id) || null;
      }
      
      findUniqueCache.set(cacheKey, college);
      return college;
    },
    
    findMany: async (args?: { where?: any; orderBy?: any; skip?: number; take?: number }) => {
      const cacheKey = JSON.stringify(args || {});
      if (findManyCache.has(cacheKey)) {
        return findManyCache.get(cacheKey)!;
      }

      const { where, orderBy, skip = 0, take } = args || {};
      let results = collegesData.filter((c) => matchCollege(c, where));
      
      if (orderBy) {
        results = sortColleges(results, orderBy);
      }
      if (skip > 0) {
        results = results.slice(skip);
      }
      if (typeof take === "number") {
        results = results.slice(0, take);
      }
      
      findManyCache.set(cacheKey, results);
      return results;
    },
    
    count: async (args?: { where?: any }) => {
      const cacheKey = JSON.stringify(args || {});
      if (countCache.has(cacheKey)) {
        return countCache.get(cacheKey)!;
      }

      const { where } = args || {};
      const countVal = collegesData.filter((c) => matchCollege(c, where)).length;
      
      countCache.set(cacheKey, countVal);
      return countVal;
    }
  }
};
