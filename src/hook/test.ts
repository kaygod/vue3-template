
  function getData<T extends string>(list:any):{[key in T]:any}{
    const d:unknown = {
      "a":"212",
      "b":"212",
      "c":"212"
    }
    const result = d as {[key in T]:any};
    return result;
  }

  const data = ["e","f","g"] as const;

  type T = typeof data[number];

  const result = getData<T>(data);

