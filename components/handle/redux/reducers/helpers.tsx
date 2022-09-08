import { format } from "date-fns";

export const parseTime = (a: number) => {

  console.log(`Making time ${a}`);
  let ti = new Date(a * 1000);
  const out = format(ti, "H:mma, MMMM do, yyyy");
  console.log(`Making time complete ${out}`);
  return out;
};

export const parseTimeShort = (a: number) => {

  console.log(`Making time short ${a}`);
  let ti = new Date(a );
  const out = format(ti, " MMMM do, yyyy");
  console.log(`Making time short complete ${out}`);
  return out;
};
