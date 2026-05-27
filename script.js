import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDfBbpW7OYru9k6rYb0F5vpzIXmbEliuwA",
  authDomain: "penseilog.firebaseapp.com",
  projectId: "penseilog"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ----------------------------

async function adicionarPensamento() {
  const input = document.getElementById("TipoPensamento");
  const nome = input.value;

  await addDoc(collection(db, "pensamentos"), {
    nome: nome,
    total: 0
  });

  alert("Pensamento adicionado!");
  input.value = "";
  carregarPensamentos();
}

async function registrarPensamento(id, totalAtual) {
  const ref = doc(db, "pensamentos", id);

  await updateDoc(ref, {
    total: totalAtual + 1
  });

  carregarPensamentos();
}

async function carregarPensamentos() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "pensamentos"));

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const div = document.createElement("div");

    div.innerHTML = `
      ${data.nome} - ${data.total}
      <button onclick="registrarPensamento('${docSnap.id}', ${data.total})">
        Pensei
      </button>
    `;

    lista.appendChild(div);
  });
}

carregarPensamentos();

window.adicionarPensamento = adicionarPensamento;
window.registrarPensamento = registrarPensamento;