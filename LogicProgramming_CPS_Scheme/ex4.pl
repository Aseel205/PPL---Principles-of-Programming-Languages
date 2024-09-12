/*
 * **********************************************
 * Printing result depth
 *
 * You can enlarge it, if needed.
 * **********************************************
 */

 edge(a,b).
 edge(a,c).
 edge(c,b).
 edge(c,a).

% Signature: path(Node1, Node2, Path)/3
% Purpose: Path is a path, denoted by a list of nodes, from Node1 to Node2.

% Base case: a path from a node to itself is the node itself
path(Node, Node, [Node]).

% Recursive case: there is a path from Node1 to Node2 if there is an edge from Node1 to an intermediate Node3,
% and there is a path from Node3 to Node2
path(Node1, Node2, [Node1|Path]) :-
    edge(Node1, Node3),
    path(Node3, Node2, Path).

% Signature: cycle(Node, Cycle)/2
% Purpose: Cycle is a cyclic path, denoted a list of nodes, from Node1 to Node1.
cycle(Node, [Node|Cycle]) :-
    edge(Node, NextNode), % Ensure the cycle starts with an edge from Node
    path(NextNode, Node, Cycle),
    length(Cycle, Length),
    Length > 1.
% Signature: nodes(Nodes)/1
% Purpose: Nodes are the nodes in the graph

% Signature: reverse(Graph1, Graph2)/2
% Purpose: The edges in Graph1 are reversed in Graph2

reverse([], []).

reverse([[X, Y] | Rest], [[Y, X] | ReversedRest]) :-
    reverse(Rest, ReversedRest).


% Signature: degree(Node, Graph, Degree)/3
% Purpose: Degree is the degree of node Node, denoted by a Church number (as defined in class)

natural_number(zero).
natural_number(s(X)) :- natural_number(X).

count_edges(_, [], zero).

count_edges(Node, [[Node, _] | Rest], s(Count)) :-
    count_edges(Node, Rest, Count).

count_edges(Node, [[_, _] | Rest], Count) :-
    count_edges(Node, Rest, Count).

% Main predicate to find the degree of a node in a graph
degree(Node, Graph, Degree) :-
    count_edges(Node, Graph, Degree).






% Signature: spanning_tree(Tree)/1
% Purpose: Tree is a spanning tree of the graph (as defined by the edge predicates), denoted by the pre-order list of nodes in the tree.
