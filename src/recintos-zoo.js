class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: ['macaco'], espacoOcupado: 3, carnivoroPresente: false },
        { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [], espacoOcupado: 0, carnivoroPresente: false },
        { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: ['gazela'], espacoOcupado: 2, carnivoroPresente: false },
        { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [], espacoOcupado: 0, carnivoroPresente: false },
        { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: ['leao'], espacoOcupado: 3, carnivoroPresente: true }
      ];
  
      this.animaisPermitidos = {
        'LEAO': { tamanho: 3, bioma: ['savana'], carnivoro: true },
        'LEOPARDO': { tamanho: 2, bioma: ['savana'], carnivoro: true },
        'CROCODILO': { tamanho: 3, bioma: ['rio'], carnivoro: true },
        'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
        'GAZELA': { tamanho: 2, bioma: ['savana'], carnivoro: false },
        'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
      };
    }
  
    analisaRecintos(animal, quantidade) {
      const animalInfo = this.animaisPermitidos[animal.toUpperCase()];
  
      // Validar se o animal existe
      if (!animalInfo) {
        return { erro: 'Animal inválido' };
      }
  
      // Validar quantidade
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: 'Quantidade inválida' };
      }
  
      const espacoNecessario = animalInfo.tamanho * quantidade + (quantidade > 1 ? 1 : 0); // 1 espaço extra para mais de 1 espécie no mesmo recinto
      let recintosViaveis = [];
  
      // Checar os recintos disponíveis
      this.recintos.forEach(recinto => {
        const espacoRestante = recinto.tamanhoTotal - recinto.espacoOcupado;
  
        // Verificar bioma e espaço disponível
        const biomaAdequado = animalInfo.bioma.includes(recinto.bioma);
        const temEspacoSuficiente = espacoRestante >= espacoNecessario;
  
        // Regras para animais carnívoros
        const podeColocarCarnivoro = !animalInfo.carnivoro || (animalInfo.carnivoro && recinto.animais.every(a => a.toUpperCase() === animal.toUpperCase()));
  
        // Regras para Hipopótamo (tolerância apenas em recintos com savana e rio)
        const podeColocarHipopotamo = (animal.toUpperCase() !== 'HIPOPOTAMO') || (recinto.bioma === 'savana e rio' || recinto.animais.length === 0);
  
        // Regras para Macacos (não podem ficar sozinhos)
        const macacoNaoSozinho = !(animal.toUpperCase() === 'MACACO' && recinto.animais.length === 0 && quantidade === 1);
  
        if (biomaAdequado && temEspacoSuficiente && podeColocarCarnivoro && podeColocarHipopotamo && macacoNaoSozinho) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoRestante - espacoNecessario} total: ${recinto.tamanhoTotal})`);
        }
      });
  
      if (recintosViaveis.length > 0) {
        return { recintosViaveis: recintosViaveis.sort((a, b) => a.numero - b.numero) };
      } else {
        return { erro: 'Não há recinto viável' };
      }
    }
  }
  
  // Exemplo de uso:
  const zoo = new RecintosZoo();

console.log(zoo.analisaRecintos('LEAO', 3));      // Teste 1
console.log(zoo.analisaRecintos('MACACO', 5));    // Teste 2
console.log(zoo.analisaRecintos('LEOPARDO', 2));  // Teste 3
console.log(zoo.analisaRecintos('HIPOPOTAMO', 4));// Teste 4
console.log(zoo.analisaRecintos('CROCODILO', 1)); // Teste 5
console.log(zoo.analisaRecintos('MACACO', 10));   // Teste 6
console.log(zoo.analisaRecintos('GAZELA', 2));    // Teste 7
console.log(zoo.analisaRecintos('MACACO', 6));    // Teste 8


  