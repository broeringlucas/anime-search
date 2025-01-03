export const getJSON = async function (url) {
  try {
    const res = await fetch(url);

    // Verifica se a resposta foi bem-sucedida (status 200-299)
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // Exibe uma mensagem mais clara no console ou trata o erro de alguma forma
    console.error("Erro ao buscar dados:", error);
    throw error; // Opcional: Lançar o erro para ser tratado no componente que chama esta função
  }
};
