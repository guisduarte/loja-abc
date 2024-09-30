export default function cadastroFormulario() {
  const botoesCadastrar = document.querySelectorAll('.container form button');
  //Ao clique de cada botão cadastrar
  botoesCadastrar.forEach((botao) => {
    botao.addEventListener('click', function (event) {
      event.preventDefault();

      const secaoFormulario = botao.closest('div');
      const camposDoFormulario =
        secaoFormulario.querySelectorAll('input, select');

      let dadosDoFormulario = {};
      camposDoFormulario.forEach((campo) => {
        dadosDoFormulario[campo.name] = campo.value;
      });

      // Mapeia a seção do formulário com a chave de armazenamento no localStorage
      const secaoMapeamento = {
        cliente: 'clientes',
        categoria: 'categorias',
        produto: 'produtos',
        vendedor: 'vendedores',
        pedido: 'pedidos',
      };

      // Função para salvar os dados no localStorage
      const salvarDados = (tipo) => {
        let dadosExistentes = JSON.parse(localStorage.getItem(tipo)) || [];
        dadosExistentes.push(dadosDoFormulario);
        localStorage.setItem(tipo, JSON.stringify(dadosExistentes));
        alert(
          `${
            tipo.charAt(0).toUpperCase() + tipo.slice(1)
          } cadastrado com sucesso!`,
        );
      };

      // Verifica qual seção do formulário está sendo usada e salva os dados
      Object.keys(secaoMapeamento).forEach((classe) => {
        if (secaoFormulario.classList.contains(classe)) {
          salvarDados(secaoMapeamento[classe]);
        }
      });

      // Limpar os campos do formulário
      camposDoFormulario.forEach((campo) => {
        if (campo.tagName === 'SELECT') {
          campo.selectedIndex = 0;
        } else {
          campo.value = '';
        }
      });
    });
  });
}
