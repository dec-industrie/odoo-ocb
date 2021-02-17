# -*- coding: utf-8 -*-

from progressbar import bar

def progressbar(iterator, min_value=0, max_value=None,
                widgets=None, prefix=None, suffix=None, **kwargs):
    pb = bar.ProgressBar(
        min_value=min_value, max_value=max_value,
        widgets=widgets, prefix=prefix, suffix=suffix, **kwargs)

    if len(iterator) <= 1:
        for result in iterator:
            yield result
    else:
        for result in pb(iterator):
            yield result
