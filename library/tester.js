// reprogrammed package from coding train
class Tester {

    constructor() {
        this.testGroups = [];
    }

    describe(description,func){
        let testGroup = {};
        testGroup.description = description;
        testGroup.tests = [];
        this.testGroups.push(testGroup);
        func();
    }

    test(s, func) {
        let test = {};
        test.expectEntries = [];
        test.description = s;
        let testGroup = this.last(this.testGroups);
        testGroup.tests.push(test);
        func();
    }

    expect(value){
        let testGroup = this.last(this.testGroups);
        let test = this.last(testGroup.tests);
        let expectEntry = {};
        expectEntry.resultValue = value;
        test.expectEntries.push(expectEntry);
        return this;
    }
    toBe(value) {
        let testGroup = this.last(this.testGroups);
        let test = this.last(testGroup.tests);
        let ex = this.last(test.expectEntries);
        ex.expectValue = value;
        if (ex.expectValue == ex.resultValue) {
            ex.result = true;
        } else {
            ex.result = false;
        }
    }

    notToBe(value) {
        let testGroup = this.last(this.testGroups);
        let test = this.last(testGroup.tests);
        let ex = this.last(test.expectEntries);
        ex.expectValue = value;
        if (ex.expectValue == ex.resultValue) {
            ex.result = false;
        } else {
            ex.result = true;
        }
    }

    toBeGreaterThan(value){
        let testGroup = this.last(this.testGroups);
        let test = this.last(testGroup.tests);
        let ex = this.last(test.expectEntries);
        ex.expectValue = value;
        if (ex.expectValue > ex.resultValue) {
            ex.result = false;
        } else {
            ex.result = true;
        }
    }
    toBeLessThan(value){
        let testGroup = this.last(this.testGroups);
        let test = this.last(testGroup.tests);
        let ex = this.last(test.expectEntries);
        ex.expectValue = value;
        if (ex.expectValue < ex.resultValue) {
            ex.result = false;
        } else {
            ex.result = true;
        }
    }

    toBeEqual(value){
        let testGroup = this.last(this.testGroups);
        let test = this.last(testGroup.tests);
        let ex = this.last(test.expectEntries);
        ex.expectValue = value;
        if (JSON.stringify(ex.expectValue) == JSON.stringify(ex.resultValue)) {
            ex.result = true;
        } else {
            ex.result = false;
        }        
    }
    getJson(){
        let s = JSON.stringify(this.testGroups);
        return s;
    }

    getHTML() {
        let s = "";
        let color = "lightgreen";

        this.testGroups.forEach(tg =>{
            s +="<br><br><b>"+tg.description+"</b>";
            tg.tests.forEach(t =>{
                s+="<br>"+t.description+": ";
                t.expectEntries.forEach(ee =>{
                    color = ee.result ? "lightgreen": "orange";
                    s+='<span style="margin-left:10px;background-color:'+color+'"> Result: '
                    +ee.result
                    +"</span>";
                })
            })
        });

        return s;
    }
    last(x){
        return x[x.length -1];
    }
}