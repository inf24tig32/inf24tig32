// Esta função é chamada quando o utilizador clica no botão "Carregar dados XML"
function carregarXML() {
  // Vai buscar (fetch) o ficheiro 'dados.xml'
  fetch("dados.xml")
    // Quando a resposta chega, converte-a em texto
    .then((response) => response.text())

    // Depois, converte o texto em XML utilizável (documento DOM XML)
    .then((str) =>
      new window.DOMParser().parseFromString(str, "text/xml")
    )

    // Aqui temos acesso ao conteúdo XML estruturado
    .then((data) => {
      // Vamos buscar todos os elementos <reforma> do ficheiro XML
      const reformas = data.getElementsByTagName("reforma");

      // Começamos a construir a tabela em HTML
      let tabela = "<table><thead><tr><th>Ano</th><th>Nome</th><th>Descrição</th></tr></thead><tbody>";

      // Ciclo para percorrer todas as reformas encontradas no XML
      for (let i = 0; i < reformas.length; i++) {
        // Vai buscar o valor do ano
        const ano = reformas[i].getElementsByTagName("ano")[0].textContent;

        // Vai buscar o nome da reforma
        const nome = reformas[i].getElementsByTagName("nome")[0].textContent;

        // Vai buscar a descrição da reforma
        const descricao = reformas[i].getElementsByTagName("descricao")[0].textContent;

        // Adiciona uma linha à tabela com os dados recolhidos
        tabela += `<tr><td>${ano}</td><td>${nome}</td><td>${descricao}</td></tr>`;
      }

      // Fecha a tabela
      tabela += "</tbody></table>";

      // Coloca a tabela dentro do elemento com id="conteudo-xml"
      document.getElementById("conteudo-xml").innerHTML = tabela;
    })

    // Se der erro (ex: ficheiro não encontrado), mostra mensagem de erro no ecrã e na consola
    .catch((error) => {
      document.getElementById("conteudo-xml").innerHTML = "Erro ao carregar o XML.";
      console.error(error);
    });
}
