/* 
    THIS IS A TEST VERSION FOR NOW, THEN THE CODE WILL BE REWRITTEN AND OPTIMIZED, SO DON'T BE SURPRISED THAT THE DUPLICATION IS SO BAD :)
*/

/** @param {{ grade: number, ignore: RegExp }} params */
function RemMode(params = {}) {
    return (blick) => {
        const { grade, ignore } = params;

        const toRem = (obj) => (params) => {
            obj._values = params
                .parseValue(obj)
                ?.map((e) => (+e.raw ? e.raw / (grade || 16) + 'rem' : e.raw));
            return obj;
        };

        let text_obj = { ...blick.class.text({ value: '1' }) };
        let flex_obj = { ...blick.class.flex({ value: '1' }) };

        blick.class.text = (e) => {
            // text_obj._vals = { lg: "1.125rem" }
            text_obj._prop =
                +e.value?.[0] || text_obj._vals?.[e.value]
                    ? 'font-size: $'
                    : 'color: $';
            return toRem(text_obj)(e);
        };

        blick.class.flex = (e) => {
            flex_obj._prop = 'gap: $';
            return toRem(flex_obj)(e);
        };

        blick.attr.grid._else = blick.attr.flex._else = (e) =>
            +e.style[0] ? toRem({ _prop: 'gap:$' }) : undefined;

        blick.attr.text._else = (e) =>
            +e.style[0]
                ? toRem({ _prop: 'font-size:$' })
                : { _prop: 'color:$' };

        function recursive(obj) {
            Object.entries(obj).map(([k, v]) => {
                if (!k.startsWith('_')) {
                    if (typeof v == 'object') {
                        recursive(v);
                        if (v._unit == 'px' && !ignore?.test(v._prop)) {
                            obj[k] = toRem(v);
                        }
                    }
                }
            });
        }

        recursive(blick.class);
    };
}
