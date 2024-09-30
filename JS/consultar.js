export default function consultar() {
  const consultarBtn = document.querySelector('#consultar');
  const resultadoContainer = document.querySelector('.resultado');
  function pegarPrimeiraLetra(srt) {
    return srt.charAt(0).toUpperCase() + srt.slice(1);    
  }
  
  consultarBtn.addEventListener('click', () => {
    const termoDeBusca = document.querySelector('#consulta').value.toLowerCase();
    
    // Checar se há um termo de busca
    if (!termoDeBusca) {
      resultadoContainer.innerHTML = 'Por favor, digite um termo de busca.';
      return;      
    }

    // Exemplo de tipos que se pode buscar no localStorage.
    const tipos = ['clientes', 'categorias', 'produtos', 'vendedores', 'pedidos'];

    let resultados = [];
    
    // Itera sobre cada tipo e busca os dados correspondentes no localStorage.
    tipos.forEach((tipo) => {
      const dados = JSON.parse(localStorage.getItem(tipo)) || [];

      // Filtra os dados para encontrar algum que corresponda ao termo de busca.
      const encontrados = dados.filter((item) =>
        Object.values(item).some((valor) =>
          valor.toLowerCase().includes(termoDeBusca)
        )
      );

      if (encontrados.length) {
        resultados.push({ tipo, encontrados });
      }
    });

    // Exibe os resultados na modal
    if (resultados.length) {
      resultadoContainer.innerHTML = resultados
        .map((resultado) =>
          `<h3>${resultado.tipo.charAt(0).toUpperCase() + resultado.tipo.slice(1)}</h3>
          <ul>${resultado.encontrados.map(
            (item) =>
              `<li>${Object.entries(item)
                .map(([key, value]) => `${pegarPrimeiraLetra(key)}: ${pegarPrimeiraLetra(value)}`)
                .join(' <br>')}</li>`
          ).join('')}</ul>`
        ).join('');
    } else {
      resultadoContainer.innerHTML = 'Nenhum resultado encontrado.';
    }
  });
}

