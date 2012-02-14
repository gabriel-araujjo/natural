
/*
Copyright (c) 2011, Chris Umbel

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

var doubleMetaphone = require('lib/natural/phonetics/double_metaphone');

describe('double metaphone', function() {
    it('should drop initial silent consonants', function() {
    	var encodings = doubleMetaphone.process('gnat', function (spy) {
			expect(spy.initialSilentConsonantSkipped).toBeTruthy();    		
    	});
    });

    describe('vowels', function() {
	    it('should consider initial vowels to be A', function() {
	    	var encodings = doubleMetaphone.process('England');
	    	expect(encodings[0]).toMatch(/^A/);
	    	expect(encodings[1]).toMatch(/^A/);
	    	
			encodings = doubleMetaphone.process('astromech');
	    	expect(encodings[0]).toMatch(/^A/);
	    	expect(encodings[1]).toMatch(/^A/);

			encodings = doubleMetaphone.process('être');
	    	expect(encodings[0]).toMatch(/^A/);
	    	expect(encodings[1]).toMatch(/^A/);    

			encodings = doubleMetaphone.process('éte');
	    	expect(encodings[0]).toMatch(/^A/);
	    	expect(encodings[1]).toMatch(/^A/);
	    });    	
    });

    describe('B', function() {
	    it('should encode B to P', function() {
	    	var encodings = doubleMetaphone.process('berry');
	    	expect(encodings[0]).toMatch(/^P/);
	    	expect(encodings[1]).toMatch(/^P/);    	
	    });

	    it('should encode BB to P', function() {
	    	var encodings = doubleMetaphone.process('tabby');
	    	expect(encodings[0]).toContain('P');
	    	expect(encodings[0]).toNotContain('PP');
	    	expect(encodings[0]).toNotContain('PB');    	
	    	expect(encodings[1]).toContain('P');
	    	expect(encodings[1]).toNotContain('PP');
	    	expect(encodings[1]).toNotContain('PB');
	    });    	
    });

    describe('C', function() {
	    it('should encode case Ç (French) to S', function() {
	    	var encodings = doubleMetaphone.process('leçon');
	    	expect(encodings[0]).toContain('S');
	    	expect(encodings[1]).toContain('S');
	    });
    });

    describe('D', function() {
    	it('should encode D to T', function() {
	    	var encodings = doubleMetaphone.process('double');
	    	expect(encodings[0]).toMatch(/^T/);
	    	expect(encodings[1]).toMatch(/^T/);
    	});

    	it('should encode DD to T', function() {
	    	var encodings = doubleMetaphone.process('fiddle');
	    	expect(encodings[0]).toContain('T');
	    	expect(encodings[0]).toNotContain('TT');
	    	expect(encodings[0]).toNotContain('D');

	    	expect(encodings[1]).toContain('T');
	    	expect(encodings[1]).toNotContain('TT');
	    	expect(encodings[1]).toNotContain('D');
    	});

    	it('should encode DG to J', function() {
	    	var encodings = doubleMetaphone.process('ledge');
	    	expect(encodings[0]).toContain('J');
	    	expect(encodings[0]).toNotContain('T');
	    	expect(encodings[1]).toContain('J');
	    	expect(encodings[1]).toNotContain('T');	    	
    	});

    	it('should encode DT to T', function() {
	    	var encodings = doubleMetaphone.process('bundt');
	    	expect(encodings[0]).toMatch(/[^D]T$/);
	    	expect(encodings[1]).toMatch(/[^D]T$/);
    	});
    });

    describe('F', function() {
	    it('should encode F', function() {
	    	var encodings = doubleMetaphone.process('far');
	    	expect(encodings[0]).toContain('F');
	    	expect(encodings[1]).toContain('F');    	
	    });

	    it('should encode FF to F', function() {
	    	var encodings = doubleMetaphone.process('effect');
	    	expect(encodings[0]).toContain('F');
	    	expect(encodings[0]).toNotContain('FF');
	    	expect(encodings[1]).toContain('F');
	    	expect(encodings[1]).toNotContain('FF');
	    });    	
    });

    describe('H', function() {
	    it('should keep initial Hs', function() {
	    	var encodings = doubleMetaphone.process('hardly');
	    	expect(encodings[0]).toMatch(/^H.*/);
	    	expect(encodings[1]).toMatch(/^H.*/);
	    });

	    it('should keep Hs between vowels', function() {
	    	var encodings = doubleMetaphone.process('ahoi');
	    	expect(encodings[0]).toContain('H');
	    	expect(encodings[1]).toContain('H');
	    });

	    it('should drop Hs in words if not surrounded by vowels or starting', function() {
	    	var encodings = doubleMetaphone.process('charlie');
	    	expect(encodings[0]).toNotContain('H');
	    	expect(encodings[1]).toNotContain('H');
	    });    	
    });

    describe('L', function() {
    	it('should encode L', function() {
	    	var encodings = doubleMetaphone.process('last');
	    	expect(encodings[0]).toMatch(/^L/);
	    	expect(encodings[1]).toMatch(/^L/);	    	
    	});

    	it('should encode L to LL', function() {
	    	var encodings = doubleMetaphone.process('functionally');
	    	expect(encodings[0]).toContain('L');
	    	expect(encodings[0]).toNotContain('LL');
    	});

    	it('should encode ignore spainish-style LL entirely in secondary', function() {
	    	var encodings = doubleMetaphone.process('cabrillo');
	    	expect(encodings[0]).toContain('L');
	    	expect(encodings[1]).toNotContain('LL');
    	});    	
    });

    describe('M', function() {
    	it('should encode M', function() {
	    	var encodings = doubleMetaphone.process('meter');
	    	expect(encodings[0]).toMatch(/^M/);
	    	expect(encodings[1]).toNotContain(/^M/);    		
    	});

    	it('should skip B after M', function() {
	    	var encodings = doubleMetaphone.process('thumb');
	    	expect(encodings[0]).toMatch(/M$/);
	    	expect(encodings[1]).toNotContain(/M$/);    		
    	});
    });

    describe('N', function() {
	    it('should encode Ns', function() {
	    	var encodings = doubleMetaphone.process('natural');
	    	expect(encodings[0]).toContain('N');
	    	expect(encodings[1]).toContain('N');
	    });

	    it('should encode NN to N', function() {
	    	var encodings = doubleMetaphone.process('fanny');
	    	expect(encodings[0]).toContain('N');
	    	expect(encodings[1]).toContain('N');

	    	expect(encodings[0]).toNotContain('NN');
	    	expect(encodings[1]).toNotContain('NN');
	    });

	    it('should treat a spainish Ñ as a N', function() {
	    	var encodings = doubleMetaphone.process('jalapeño');
	    	expect(encodings[0]).toContain('N');
	    	expect(encodings[1]).toContain('N');
	    });    	
    });

    describe('P', function() {
	    it('should encode PH to F', function() {
	    	var encodings = doubleMetaphone.process('phone');
	    	expect(encodings[0]).toMatch(/^F/);
	    	expect(encodings[1]).toMatch(/^F/);
	    });

	    it('should encode P', function() {
	    	var encodings = doubleMetaphone.process('party');
	    	expect(encodings[0]).toContain('P');
	    	expect(encodings[1]).toContain('P');    	
	    });

	    it('should encode PP to P', function() {
	    	var encodings = doubleMetaphone.process('sappy');
	    	expect(encodings[0]).toContain('P');
	    	expect(encodings[0]).toNotContain('PP');
	    	expect(encodings[1]).toContain('P');    	
	    	expect(encodings[1]).toNotContain('PP');    	
	    });

	    it('should skip P before B i.e. raspberry', function() {
	    	var encodings = doubleMetaphone.process('raspberry');
	    	expect(encodings[0]).toContain('P');
	    	expect(encodings[0]).toNotContain('PP');
	    	expect(encodings[0]).toNotContain('PB');    	
	    	expect(encodings[1]).toContain('P');
	    	expect(encodings[1]).toNotContain('PP');
	    	expect(encodings[1]).toNotContain('PB');    	    	
	    });    	
    });

    describe('Q', function() {
	    it('should encode Q to K', function() {
	    	var encodings = doubleMetaphone.process('quarry');
	    	expect(encodings[0]).toContain('K');
	    	expect(encodings[1]).toContain('K');    	
	    });
    });

    describe('R', function() {
    	it('should encode R', function() {
	    	var encodings = doubleMetaphone.process('raspberry');
	    	expect(encodings[0]).toMatch(/^R/);
	    	expect(encodings[1]).toMatch(/^R/);
    	});

    	it('should ignore trailing French Rs', function() {
	    	var encodings = doubleMetaphone.process('papier');
	    	expect(encodings[0]).toMatch(/[^R]$/);
	    	expect(encodings[1]).toMatch(/R$/);
    	});
    });

    describe('T', function() {
    	it('should encode TION to XN', function() {
	    	var encodings = doubleMetaphone.process('nation');
	    	expect(encodings[0]).toMatch(/XN$/);
	    	expect(encodings[1]).toMatch(/XN$/);	    	
    	});

    	it('should encode CH sounds to X', function() {
	    	var encodings = doubleMetaphone.process('thatch');
	    	expect(encodings[0]).toMatch(/X$/);
	    	expect(encodings[1]).toMatch(/X$/);
    	});

    	it('should encode hard TH to T', function() {
	    	var encodings = doubleMetaphone.process('thomas');
	    	expect(encodings[0]).toMatch(/^T/);
	    	expect(encodings[1]).toMatch(/^T/);
    	});

    	it('should encode soft TH to 0,T', function() {
	    	var encodings = doubleMetaphone.process('this');
	    	expect(encodings[0]).toMatch(/^0/);
	    	expect(encodings[1]).toMatch(/^T/);
    	});

    	it('should encode TT to T', function() {
	    	var encodings = doubleMetaphone.process('matta');
	    	expect(encodings[0]).toMatch(/[^T]T/);
	    	expect(encodings[1]).toMatch(/[^T]T/);	    	
    	}); 

    	it('should encode TD to T', function() {
	    	var encodings = doubleMetaphone.process('countdown');
	    	expect(encodings[0]).toContain('T');
	    	expect(encodings[0]).toNotContain('D');
	    	expect(encodings[1]).toContain('T');
	    	expect(encodings[1]).toNotContain('D');
    	});
    });

	describe('V', function() {
	    it('should encode V to F', function() {
	    	var encodings = doubleMetaphone.process('very');
	    	expect(encodings[0]).toContain('F');
	    	expect(encodings[1]).toContain('F');    	
	    });

	    it('should encode VV to F', function() {
	    	var encodings = doubleMetaphone.process('savvy');
	    	expect(encodings[0]).toContain('F');
	    	expect(encodings[0]).toNotContain('FF');
	    	expect(encodings[0]).toNotContain('FV');    	
	    	expect(encodings[1]).toContain('F');
	    	expect(encodings[1]).toNotContain('FF');
	    	expect(encodings[1]).toNotContain('FV');
	    });
	});

	describe('W', function() {
		it('should encode WR to R', function() {
	    	var encodings = doubleMetaphone.process('wrong');
	    	expect(encodings[0]).toMatch('^R');
	    	expect(encodings[1]).toMatch('^R');	    	
		});

		it('should encode WH to A at the start of a word', function() {
	    	var encodings = doubleMetaphone.process('wheat');
	    	expect(encodings[0]).toMatch('^A');
	    	expect(encodings[1]).toMatch('^A');
		});

		it('should encode WH to A,F if followed by a vowel at start', function() {
	    	var encodings = doubleMetaphone.process('wolfgang');
	    	expect(encodings[0]).toMatch('^A');
	    	expect(encodings[1]).toMatch('^F');
		});

		it('should encode OWSKY alternately to F(V)', function() {
	    	var encodings = doubleMetaphone.process('lebowski');
	    	expect(encodings[0]).toNotContain('F');
	    	expect(encodings[1]).toContain('F');
		});

		it('should encode WICZ', function() {
	    	var encodings = doubleMetaphone.process('Lowicz');
	    	expect(encodings[0]).toMatch('TS$');
	    	expect(encodings[1]).toMatch('FX$');
		});		
	});

	describe('X', function() {
		it('should encode X as S at start', function() {
	    	var encodings = doubleMetaphone.process('xenophobia');
	    	expect(encodings[0]).toMatch(/^S/);
	    	expect(encodings[1]).toMatch(/^S/);
		});

		it('should encode X as KS at end for non-French words', function() {
	    	var encodings = doubleMetaphone.process('box');
	    	expect(encodings[0]).toMatch(/KS$/);
	    	expect(encodings[1]).toMatch(/KS$/);
		});

		it('should skip X end for French words', function() {
	    	var encodings = doubleMetaphone.process('lemieux');
	    	expect(encodings[0]).toNotMatch(/KS$/);
	    	expect(encodings[1]).toNotMatch(/KS$/);
		});
	});

	describe('Z', function() {
		it('should encode Z to S', function() {
	    	var encodings = doubleMetaphone.process('zookeeper');
	    	expect(encodings[0]).toMatch(/^S/);
	    	expect(encodings[1]).toMatch(/^S/);
		});

		it('should encode Chinese ZH to J', function() {
	    	var encodings = doubleMetaphone.process('zheng');
	    	expect(encodings[0]).toMatch(/^J/);
	    	expect(encodings[1]).toMatch(/^J/);
		});

		it('should encode ZZA to S, TS', function() {
	    	var encodings = doubleMetaphone.process('pizza');
	    	expect(encodings[0]).toContain('S');
	    	expect(encodings[1]).toContain('TS');
		});
	});

    describe('general', function() {
    	it('should detect vowels', function() {
    		expect(doubleMetaphone.isVowel('a')).toBeTruthy();
    		expect(doubleMetaphone.isVowel('e')).toBeTruthy();
    		expect(doubleMetaphone.isVowel('b')).toBeFalsy();    		
    	});

    	it('should detect Slavo-Germanic text', function() {
    		doubleMetaphone.process('horowitz', function(spy) {
    			expect(spy.slavoGermanic).toBeTruthy();
    		});

    		doubleMetaphone.process('gumball', function(spy) {
    			expect(spy.slavoGermanic).toBeFalsy();
    		});    		
    	});
    });    
});