function buyAbility(id){

    const ability = shop.find(a=>a.id===id);

    if(playerData.cenes < ability.price)
        return false;

    if(playerData.unlockedAbilities.includes(id))
        return false;

    playerData.cenes -= ability.price;

    playerData.unlockedAbilities.push(id);

    saveGame();

    return true;

}
