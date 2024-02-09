from abc import ABC, abstractmethod

class Abstract_Piece():
    def __init__(self, rank, file, width, height, isWhite, img):
        self.rank = rank
        self.file = file
        self.width = width
        self.height = height
        self.isWhite = isWhite
        self.img = img

    def get_rank(self):
        return self.rank
        
    def get_file(self):
        return self.file
        
    def is_white(self):
        return self.isWhite
    
class Pawn(Abstract_Piece):
    def __init__(self, rank, file, width, height, is_white, img):
        super().__init__(rank, file, width, height, is_white, img)

class Knight(Abstract_Piece):
    def __init__(self, rank, file, width, height, is_white, img):
        super().__init__(rank, file, width, height, is_white, img)
    


