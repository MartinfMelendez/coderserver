const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  constructor() {
    this.path = "./user.json"; //ruta donde se crea el archivo
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("Archivo creada");
    } else {
      console.log("archivo ya existe");
    }
  }

  async create(data) {
    try {
      if (!data.email || !data.password) {
        throw new Error("Ingrese un mail o constraseña");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          photo: data.photo || "foto.jpg",
          email: data.email,
          password: data.password,
          role: crypto.randomBytes(12).toString("hex"),
        };
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(user);
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        console.log("Usuario creado");
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each.id === id);
      if (!one) {
        throw new Error("No encontrado");
      } else {
        console.log(one);
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each.id === id);
      if (!one) {
        throw new Error("No encontrado");
      } else {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log("Usuario eliminado");
        console.log(one);
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
}

async function test() {
  const user = new UserManager();
  await user.create({
    photo: "algo.jpg",
    email: "pedro@das.com",
    password: "pedrodas",
  });
  await user.create({
    photo: "algo.jpg",
    email: "martin@das.com",
    password: "pedrodas",
  });
  await user.create({
    photo: "",
    email: "maxi@das.com",
    password: "pedrodas",
  });
  await user.create({
    photo: "algo.jpg",
    email: "juan@das.com",
    password: "",
  });
  await user.read();
  //await user.readOne("df31056aef91b7de048fdc78")
  //await user.destroy("f6aa8edda5d86b9dbe939321")
}

test();
