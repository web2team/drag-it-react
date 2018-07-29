function* idMaker() {
  var index = 0;
  while (true) {
    yield index++;
  }
}
const gen = idMaker();
export const getKey = () => gen.next().value;
