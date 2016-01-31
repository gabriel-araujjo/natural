/*
 Copyright (c) 2016, Gabriel Araújo

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 */


/**
 *  Implementation of RSLP stemmer by Viviane Moreira Orengo e Christian Huyck
 *  published in paper A Stemmer Algorithm for the Portuguese Language
 *
 *  References:
 *  http://www.inf.ufrgs.br/~viviane/rslp/
 *
 */
module.exports = (function () {
  'use strict';

  //noinspection JSConsecutiveCommasInArrayLiteral
  var reductions = {
    plural : {
      condition: ['s', 3], // [suffix, min word size]
      testExceptionsAsSuffix: true,
      rules: [
        ['algumas', 'algum', 'r0'],,
        ['ênseis', 'ênsil', 'r0'],,
        ['ísseis', 'íssel', 'r0'],,
        ['ósseis', 'óssil', 'r0'],,
        ['ágeis', 'ágil', 'r0'],,
        ['ébeis', 'ébil', 'r0'],,
        ['éreis', 'éril', 'r0'],,
        ['teis', 'til', 'r0'],,
        ['ões', 'ão', 'r3'],,
        ['ães', 'ão', 'r1'],['mães'],
        ['ais', 'al', 'r1'],['cais', 'mais'],
        ['éis', 'el', 'r2'],,
        ['eis', 'el', 'r2'],,
        ['óis', 'ol', 'r2'],,
        ['les', 'l', 'r3'],,
        ['res', 'r', 'r3'],,
        ['ns', 'm', 'r1'],,
        ['is', 'il', 'r2'],['lápis','cais','mais','crúcis','biquínis','pois','depois','dois','leis'],
        ['s', '', 'r2'],['aliás','pires','lápis','cais','mais','mas','menos',
          'férias','fezes','pêsames','crúcis','gás',
          'atrás','moisés','através','convés','ês',
          'país','após','ambas','ambos','messias']
      ]
    },
    feminine: {
      condition: [['a', 'ã'], 3],
      rules: [
        ['ânea', 'âneo', 'r3'],['coletânea','miscelânea'],
        ['inha', 'inho', 'r3'],["rainha","linha","minha"],
        ['íaca', 'íaco', 'r3'],,
        ['eira', 'eiro', 'r3'],["beira","cadeira","frigideira","bandeira","feira","capoeira","barreira","fronteira","besteira","poeira"],
        ['ona', 'ão', 'r3'],["abandona","lona","iona","cortisona","monótona","maratona","acetona","detona","carona"],
        ['ora', 'or', 'r3'],,
        ['esa', 'ês', 'r3'],["mesa","obesa","princesa","turquesa","ilesa","pesa","presa"],
        ['osa', 'oso', 'r3'],["mucosa","prosa"],
        ['ica', 'ico', 'r3'],['dica'],
        ['ada', 'ado', 'r2'],['pitada'],
        ['ida', 'ido', 'r3'],['vida'],
        ['ída', 'ido', 'r3'],['recaída','saída','dúvida'],
        ['imo', 'imo', 'r3'],['vítima'],
        ['iva', 'ivo', 'r3'],['saliva','oliva'],
        ['na', 'no', 'r4'],["carona","abandona","lona","iona","cortisona","monótona","maratona","acetona","detona","guiana","campana","grana","caravana","banana","paisana"],
        ['ea', 'eo', 'r3'],['área','áurea', 'côdea', 'fêmea', 'rédea', 'alínea', 'córnea', 'drágea', 'náusea', 'várzea', 'orquídea'],
        ['ã', 'ão', 'r2'],["amanhã","arapuã","fã","divã"]
      ]
    },
    adverb: {
      testExceptionsAsSuffix: true,
      rules: [
        ['mente', '', 'r4'],['experimente']
      ]
    },
    augmentative: {
      rules: [
        ['abilíssimo', '', 'r5'],,
        ['díssimo', '', 'r5'],,
        ['érrimo', '', 'r4'],,
        ['íssimo', '', 'r3'],,
        ['quinho', 'c', 'r4'],,
        ['adinho', '', 'r3'],,
        ['zarrão', '', 'r3'],,
        ['arraz', '', 'r4'],,
        ['arrão', '', 'r4'],,
        ['alhão', '', 'r4'],,
        ['ésimo', '', 'r3'],,
        ['zinho', '', 'r2'],,
        ['uinho', '', 'r4'],,
        ['inho', '', 'r3'],['caminho','cominho'],
        ['adão', '', 'r4'],,
        ['idão', '', 'r4'],,
        ['ázio', '', 'r3'],['topázio'],
        ['arra', '', 'r3'],,
        ['uça', '', 'r4'],,
        ['aço', '', 'r4'],['antebraço'],
        ['aça', '', 'r4'],,
        ['zão', '', 'r2'],['coalizão'],
        ['ão', '', 'r3'],['camarão','chimarrão','canção','coração','embrião','grotão','glutão',
          'ficção','fogão','feição','furacão','gamão','lampião','leão','macacão','nação',
          'órfão','orgão','patrão','portão','quinhão','rincão','tração',
          'falcão','espião','mamão','folião','cordão','aptidão','campeão',
          'colchão','limão','leilão','melão','barão','milhão','bilhão','fusão',
          'cristão','ilusão','capitão','estação','senão']
      ]
    },
    noun: {
      rules: [
        ["encialista", '', 'r4'],,
        ['abilidade', '', 'r5'],,
        ['icionista', '', 'r4'],,
        ['cionista', '', 'r5'],,
        ['alístico', '', 'r3'],,
        ['ividade', '', 'r4'],,
        ['ionista', '', 'r5'],,
        ['iamento', '', 'r4'],,
        ['alizado', '', 'r4'],,
        ['atizado', '', 'r4'],,
        ['alista', '', 'r5'],,
        ['amento', '', 'r3'],["firmamento","fundamento","departamento"],
        ['imento', '', 'r3'],,
        ['tizado', '', 'r4'],["alfabetizado"],
        ['atoria', '', 'r5'],,
        ['edouro', '', 'r3'],,
        ['queiro', 'c', 'r3'],,
        ['gueiro', 'g', 'r2'],,
        ['adeiro', '', 'r4'],["desfiladeiro"],
        ['alizaç', '', 'r5'],,
        ['atizaç', '', 'r5'],,
        ['atório', '', 'r3'],,
        ['alismo', '', 'r4'],,
        ['ivismo', '', 'r4'],,
        ['ástico', '', 'r4'],["eclesiástico"],
        ['áutico', '', 'r4'],,
        ['êutico', '', 'r4'],,
        ['encial', '', 'r5'],,
        ['idade', '', 'r4'],["autoridade","comunidade"],
        ['quice', 'c', 'r4'],,
        ['tizaç', '', 'r5'],,
        ['mento', '', 'r6'],["firmamento","elemento","complemento","instrumento","departamento"],
        ['izado', '', 'r5'],["organizado","pulverizado"],
        ['ativo', '', 'r4'],["pejorativo","relativo"],
        ['ionar', '', 'r5'],,
        ['ional', '', 'r4'],,
        ['ência', '', 'r3'],,
        ['ância', '', 'r4'],["ambulância"],
        ['agem', '', 'r3'],["coragem","chantagem","vantagem","carruagem"],
        ['tivo', '', 'r4'],["relativo"],
        ['ador', '', 'r3'],,
        ['edor', '', 'r3'],,
        ['idor', '', 'r4'],["ouvidor"],
        ['eiro', '', 'r3'],["desfiladeiro","pioneiro","mosteiro"],
        ['uoso', '', 'r3'],,
        ['izaç', '', 'r5'],["organizaç"],
        ['ário', '', 'r3'],["voluntário","salário","aniversário","diário","lionário","armário"],
        ['tico', '', 'r3'],["político","eclesiástico","diagnostico","prático","doméstico","diagnóstico", "idêntico","alopático","artístico","autêntico","eclético","crítico","critico"],
        ['ante', '', 'r2'],["gigante","elefante","adiante","possante","instante","restaurante"],
        ['esco', '', 'r4'],,
        ['ério', '', 'r6'],,
        ['oria', '', 'r4'],["categoria"],
        ['ismo', '', 'r3'],["cinismo"],
        ['íaco', '', 'r3'],,
        ['ente', '', 'r4'],["frequente","alimente","acrescente","permanente","oriente","aparente"],
        ['ense', '', 'r5'],,
        ['inal', '', 'r3'],,
        ['ista', '', 'r4'],,
        ['auta', '', 'r5'],,
        ['ável', '', 'r2'],["afável","razoável","potável","vulnerável"],
        ['ível', '', 'r3'],["possível"],
        ['ural', '', 'r4'],,
        ['âneo', '', 'r0'],,
        ['ice', '', 'r4'],["cúmplice"],
        ['ano', '', 'r4'],,
        ['vel', '', 'r5'],["possível","vulnerável","solúvel"],
        ['bil', 'vel', 'r3'],,
        ['ura', '', 'r4'],["imatura","acupuntura","costura"],
        ['ual', '', 'r3'],["bissexual","virtual","visual","pontual"],
        ['ial', '', 'r3'],,
        ['ico', '', 'r4'],["tico","público","explico"],
        ['eza', '', 'r3'],,
        ['rio', '', 'r5'],["voluntário","salário","aniversário","diário","compulsório", "lionário","próprio","stério","armário"],
        ['oso', '', 'r3'],["precioso"],
        ['ivo', '', 'r4'],["passivo","possessivo","pejorativo","positivo"],
        ['ado', '', 'r2'],["grado"],
        ['ido', '', 'r3'],["cândido","consolido","rápido","decido","tímido","duvido","marido"],
        ['dor', '', 'r4'],["ouvidor"],
        ['sor', '', 'r4'],["assessor"],
        ['tor', '', 'r3'],["benfeitor","leitor","editor","pastor","produtor","promotor","consultor"],
        ['or', '', 'r2'],["motor","melhor","redor","rigor","sensor","tambor","tumor","assessor", "benfeitor","pastor","terior","favor","autor"],
        ['aç', '', 'r3'],["equaç","relaç"],
        ['iç', '', 'r3'],["eleiç"],
        ['ês', '', 'r4'],,
        ['ez', '', 'r4'],,
        ['eo', '', 'r0'],,
        ['al', '', 'r2'],["afinal","animal","estatal","bissexual","desleal","fiscal","formal","pessoal", "liberal","postal","virtual","visual","pontual","sideral","sucursal"]
      ]
    },
    verb: {
      testExceptionsAsSuffix: true,
      rules: [
        ['aríamo', '', 'r2'],,
        ['ássemo', '', 'r2'],,
        ['eríamo', '', 'r2'],,
        ['êssemo', '', 'r2'],,
        ['iríamo', '', 'r3'],,
        ['íssemo', '', 'r3'],,
        ['aremo', '', 'r2'],,
        ['ariam', '', 'r2'],,
        ['aríei', '', 'r2'],,
        ['ássei', '', 'r2'],,
        ['assem', '', 'r2'],,
        ['ávamo', '', 'r2'],,
        ['êramo', '', 'r3'],,
        ['eremo', '', 'r3'],,
        ['eriam', '', 'r3'],,
        ['eríei', '', 'r3'],,
        ['êssei', '', 'r3'],,
        ['essem', '', 'r3'],,
        ['íramo', '', 'r3'],,
        ['iremo', '', 'r3'],,
        ['iriam', '', 'r3'],,
        ['iríei', '', 'r3'],,
        ['íssei', '', 'r3'],,
        ['issem', '', 'r3'],,
        ['áramo', '', 'r2'],,
        ['tizar', '', 'r4'],["alfabetizar"],
        ['izar', '', 'r5'],["organizar"],
        ['itar', '', 'r5'],["acreditar","explicitar","estreitar"],
        ['árei', '', 'r2'],,
        ['ando', '', 'r2'],,
        ['endo', '', 'r3'],,
        ['indo', '', 'r3'],,
        ['ondo', '', 'r3'],,
        ['aram', '', 'r2'],,
        ['arão', '', 'r2'],,
        ['arde', '', 'r2'],,
        ['arei', '', 'r2'],,
        ['arem', '', 'r2'],,
        ['aria', '', 'r2'],,
        ['armo', '', 'r2'],,
        ['asse', '', 'r2'],,
        ['aste', '', 'r2'],,
        ['avam', '', 'r2'],["agravam"],
        ['ávei', '', 'r2'],,
        ['eram', '', 'r3'],,
        ['erão', '', 'r3'],,
        ['erde', '', 'r3'],,
        ['erei', '', 'r3'],,
        ['êrei', '', 'r3'],,
        ['erem', '', 'r3'],,
        ['eria', '', 'r3'],,
        ['ermo', '', 'r3'],,
        ['esse', '', 'r3'],,
        ['este', '', 'r3'],["faroeste","agreste"],
        ['íamo', '', 'r3'],,
        ['iram', '', 'r3'],,
        ['íram', '', 'r3'],,
        ['irão', '', 'r2'],,
        ['irde', '', 'r2'],,
        ['irei', '', 'r3'],["admirei"],
        ['irem', '', 'r3'],["adquirem"],
        ['iria', '', 'r3'],,
        ['irmo', '', 'r3'],,
        ['isse', '', 'r3'],,
        ['iste', '', 'r4'],,
        ['iava', '', 'r4'],["ampliava"],
        ['iona', '', 'r3'],,
        ['guem', 'g', 'r3'],,
        ['eado', '', 'r3'],,
        ['amo', '', 'r2'],,
        ['ara', '', 'r2'],["arara","prepara"],
        ['ará', '', 'r2'],["alvará"],
        ['are', '', 'r2'],["prepare"],
        ['ava', '', 'r2'],["agrava"],
        ['emo', '', 'r2'],,
        ['era', '', 'r3'],["acelera","espera"],
        ['erá', '', 'r3'],,
        ['ere', '', 'r3'],["espere"],
        ['iam', '', 'r3'],["enfiam","ampliam","elogiam","ensaiam"],
        ['íei', '', 'r3'],,
        ['imo', '', 'r3'],["reprimo","intimo","íntimo","nimo","queimo","ximo"],
        ['ira', '', 'r3'],["fronteira","sátira"],
        ['ído', '', 'r3'],,
        ['irá', '', 'r3'],,
        ['ire', '', 'r3'],["adquire"],
        ['omo', '', 'r3'],,
        ['ear', '', 'r3'],["nuclear"],
        ['uei', '', 'r3'],,
        ['uía', 'u', 'r5'],,
        ['eou', '', 'r5'],,
        ['ai', '', 'r2'],,
        ['am', '', 'r2'],,
        ['ar', '', 'r2'],["azar","bazaar","patamar"],
        ['ei', '', 'r3'],,
        ['em', '', 'r2'],["alem","virgem"],
        ['er', '', 'r2'],["éter","pier"],
        ['eu', '', 'r3'],["chapeu"],
        ['ia', '', 'r3'],["estória","fatia","acia","praia","elogia","mania","lábia","aprecia",
          "polícia","arredia","cheia","ásia","família"],
        ['ir', '', 'r3'],["freir"],
        ['iu', '', 'r3'],,
        ['ou', '', 'r3'],,
        ['i', '', 'r3']
      ]
    },
    vowel: {
      testExceptionsAsSuffix: true,
      rules: [
        ['bil', 'vel', 'r2'],,
        ['gue', 'g', 'r2'],["gangue","jegue"],
        ['en', '', 'r2'],,
        ['on', '', 'r2'],,
        ['á', '', 'r3'],,
        ['é', '', 'r3'],,
        ['í', '', 'r3'],,
        ['ó', '', 'r3'],,
        ['ú', '', 'r3'],,
        ['ê', '', 'r3'],["bebê"],
        ['a', '', 'r3'],["ásia"],
        ['e', '', 'r3'],,
        ['o', '', 'r3'],["ão"]
      ]
    }
  };

  var Stemmer     = require('./stemmer_pt'),
    Token         = require('./token'),
    RslpStemmer = new Stemmer();

  /**
   *
   * @param {Token} token
   * @param {Object} reduction
     */
  function applyReduction(token, reduction) {

    var suffix, i, rule, exceptions, replace, region;

    if (reduction.condition) {
      // test token size
      if (token.original.length < reduction.condition[1]) return;

      // test token general suffix
      if (reduction.condition[0]) {
        suffix = reduction.condition[0];
        if (typeof suffix === 'string'){
          if (!token.hasSuffix(suffix)) return;
        } else {
          for (i = 0; i < suffix.length; i++) {
            if (token.hasSuffix(suffix[i])) break;
          }
          if (i == suffix.length) return;
        }
      }
    }
    rulesLoop:
    for (i = 0; i < reduction.rules.length; i+=2) {
      rule = reduction.rules[i];
      exceptions = reduction.rules[i+1];
      suffix = rule[0];
      replace = rule[1];
      region = rule[2];
      if (token.hasSuffixInRegion(suffix, region)) {
        if (exceptions) {
          if (reduction.testExceptionsAsSuffix) {
            for (var j = 0; j < exceptions.length; j++){
              if (token.hasSuffix(exceptions[j])) continue rulesLoop;
            }
          } else if (exceptions.indexOf(token.string) != -1) continue;
        }
        token.replaceSuffixInRegion(suffix, replace, 'r0');
        return true;
      }
    }
    return false;
  }

  /**
   * Stems a word using a RSLP stemmer (Removedor de sufixos da língua portuguesa) algorithm.
   *
   * @param  {String} word Word to stem.
   * @return {String}      Stemmed token.
   */
  RslpStemmer.stem = function (word) {
    var token = new Token(word.toLowerCase());

    token
      .markRegion('r0', 0)
      .markRegion('r1', 1)
      .markRegion('r2', 2)
      .markRegion('r3', 3)
      .markRegion('r4', 4)
      .markRegion('r5', 5)
      .markRegion('r6', 6);

    // Always do plural reduction.
    applyReduction(token, reductions.plural);

    //Always do adverb reduction
    applyReduction(token, reductions.adverb);

    //Always do feminine reduction
    applyReduction(token, reductions.feminine);

    //Always do augmentative reduction
    applyReduction(token, reductions.augmentative);

    //Noun or verb or vowel suffix reduction
    applyReduction(token, reductions.noun)
    || applyReduction(token, reductions.verb)
    || applyReduction(token, reductions.vowel);

    return token.string;
  };

  return RslpStemmer;
})();
